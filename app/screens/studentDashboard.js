import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "@rneui/base";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as LocalAuthentication from "expo-local-authentication";
import { Button, Divider, HStack, Heading, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { NativeModules, ScrollView, StyleSheet, View } from "react-native";
import { requestLocationPermission } from "../permission";
import {
  convertDateTimeIsoToTime,
  currentPeriodHelper,
  findCurrentPeriod,
  getCurrentWeekday,
} from "../utils";
import CurrentDay from "./components/currentDay";
import CurrentPeriodCard from "./components/currentPeriodCard";
import { API_URL } from "../globals";
import DismissablePopup from "./components/finalDialog";
dayjs.extend(customParseFormat);

export default function StudentDashboard() {
  const [studentInfo, setStudentInfo] = useState({
    name: "John Doe",
    currentYear: 2,
    rollNumber: "123456",
    percent: 0,
  });
  const [dialogVisible, setDialogVisible] = useState(false);
  const [timetable, setTimetable] = useState([
    // {
    //   day: "Monday",
    //   classes: [
    //     { name: "Math", time: "9:00am" },
    //     { name: "English", time: "10:00am" },
    //   ],
    // },
  ]);
  const [currentPeriod, setcurrentPeriod] = useState("No Class");
  const [bottomText, setBottomText] = useState("");

  useEffect(() => {
    async function asyncFn() {
      console.log("get async item loginId");
      const id = await AsyncStorage.getItem("loginId");
      console.log("got async item loginId: " + id);

      console.log(`fetching student info: ${id}`);
      let data = await fetch(`${API_URL}/api/getProfileDetails/student/${id}`);
      data = await data.json();
      console.log(`fetched student info: ${id}`);

      console.log(`fetching student attendance percentage: ${id}`);
      let percent = await fetch(`${API_URL}/api/getStudentPercentage/${id}`);
      percent = (await percent.text()).toString();
      console.log(`fetched student attendance percentage: ${id}`);

      setStudentInfo({
        name: data.name,
        currentYear: data.year,
        rollNumber: data.rollNo,
        percent: percent,
      });

      console.log(`fetching student schedule: ${id}`);
      let timetableData = await fetch(
        `${API_URL}/api/getScheduleStudent/${id}`
      );
      timetableData = await timetableData.json();
      console.log(`fetched student schedule: ${id}`);
      console.log(`student schedule: ${JSON.stringify(timetableData)}`);

      const finalClassess = [];
      timetableData.forEach((period) => {
        finalClassess.push({
          name: period.subject,
          time: convertDateTimeIsoToTime(period.start),
          helperTime: currentPeriodHelper(period.start),
        });
      });

      finalClassess.push({
        name: "End of Day",
        time: " 3:55 PM",
        helperTime: "15:55",
      });
      console.log(`student periods: ${JSON.stringify(finalClassess)}`);

      setTimetable([
        {
          day: getCurrentWeekday(),
          classes: finalClassess,
        },
      ]);

      const currentPeriodIdx = findCurrentPeriod(
        finalClassess.map((e) => e.helperTime)
      );
      console.log(`student current period index: ${currentPeriodIdx}`);
      setcurrentPeriod(finalClassess[currentPeriodIdx].name);
    }

    asyncFn();
  }, []);

  return (
    <VStack>
      <Heading textAlign={"center"} my="4">
        Student Dashboard
      </Heading>
      <Divider />
      <VStack bg={"white"} borderRadius={"8"} p="4" m="8">
        <Text>
          <Text bold>Name:</Text> {studentInfo.name}
        </Text>
        <Text>
          <Text bold>Year:</Text> {studentInfo.currentYear}
        </Text>
        <Text>
          <Text bold>Roll no:</Text> {studentInfo.rollNumber}
        </Text>
        <Text>
          <Text bold>Attendance Percent:</Text> {studentInfo.percent}
        </Text>
      </VStack>

      <Heading textAlign={"center"} mb="2">
        Timetable for {"todo"}
      </Heading>
      <Divider />
      <ScrollView>
        <VStack>
          <HStack justifyContent={"space-between"}>
            <Text></Text>
            <Text></Text>
          </HStack>
        </VStack>
      </ScrollView>
      <VStack>
        <Text></Text>
        <Button></Button>
      </VStack>
    </VStack>
  );

  return (
    <View style={styles.container}>
      <DismissablePopup
        text={bottomText}
        visible={dialogVisible}
        setVisible={(x) => setDialogVisible(x)}
      ></DismissablePopup>
      <Text className="text-lg font-bold text-center">Student Dashboard</Text>
      <Card>
        <Text style={styles.infoText}>Student Name: {studentInfo.name}</Text>
        <Text style={styles.infoText}>
          Current Year: {studentInfo.currentYear}
        </Text>
        <Text style={styles.infoText}>
          Roll Number: {studentInfo.rollNumber}
        </Text>
        <Text style={styles.infoText}>
          Attendance Percent {studentInfo.percent}%
        </Text>
      </Card>
      <CurrentDay />

      <ScrollView>
        <Card className="border-2" containerStyle={{ marginTop: 0 }}>
          {timetable.map((day, index) => {
            return (
              <View key={index} style={styles.dayContainer}>
                {day.classes.map((classInfo, classIndex) => (
                  <View key={classIndex} style={styles.classContainer}>
                    <Text style={styles.classText}>{classInfo.name}</Text>
                    <Text style={styles.classText}>
                      {dayjs(classInfo.helperTime, "HH:mm").format("hh:mm a")}
                    </Text>
                  </View>
                ))}
              </View>
            );
          })}
          <CurrentPeriodCard
            period={currentPeriod}
            onMarkAttendancePress={async () => {
              if (currentPeriod == "End of Day") {
                setBottomText("failed, reason: day already ended");
              } else {
                const id = await AsyncStorage.getItem("loginId");
                const biometricSucc = await (
                  await LocalAuthentication.authenticateAsync()
                ).success;
                if (!biometricSucc) {
                  setBottomText("biometric failed");
                  setDialogVisible(true);
                  return;
                }
                NativeModules.ContactTracerModule.setUserId(id).then(
                  (userId) => {
                    NativeModules.ContactTracerModule.initialize()
                      .then((result) => {
                        return NativeModules.ContactTracerModule.isBLEAvailable();
                      })

                      .then((isBLEAvailable) => {
                        if (isBLEAvailable) {
                          console.log("ble avail");
                          // BLE is available, continue requesting Location Permission
                          return requestLocationPermission();
                        } else {
                          // BLE is not available, don't do anything furthur since BLE is required
                          console.log("ble not avail");
                        }
                      })

                      .then((locAvi) => {
                        return NativeModules.ContactTracerModule.tryToTurnBluetoothOn();
                      })
                      .then(() => {
                        console.log("tuend on");
                      })

                      .then((e) => {
                        NativeModules.ContactTracerModule.enableTracerService();
                      })

                      .then((e) => {
                        setBottomText("Attendance Request Sent!");
                        setDialogVisible(true);
                      });
                  }
                );
              }
            }}
          />
          <Text>{bottomText}</Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  studentInfoContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    elevation: 1,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  timetableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  timetableContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    elevation: 1,
  },
  dayContainer: {
    marginBottom: 10,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  classContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  classText: {
    fontSize: 14,
  },
});
