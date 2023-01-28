import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "@rneui/base";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as LocalAuthentication from "expo-local-authentication";
import React, { useEffect, useState } from "react";
import {
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { requestLocationPermission } from "../permission";
import findCurrentPeriod from "../utils/currentPeriod";
import currentPeriodHelper from "../utils/currentperiodhelper";
import getCurrentWeekday from "../utils/day";
import convertDateTimeIsoToTime from "../utils/utils";
import CurrentDay from "./components/currentDay";
import CurrentPeriodCard from "./components/currentPeriodCard";
import DismissablePopup from "./components/finalDialog";
dayjs.extend(customParseFormat);
const StudentDashboard = () => {
  const [studentName, setStudentName] = useState("John Doe");
  const [currentYear, setCurrentYear] = useState("2022");
  const [rollNumber, setRollNumber] = useState("123456");
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
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    (async function () {
      const id = await AsyncStorage.getItem("loginId");
      console.log("vk_12 " + id);
      var data = await fetch(
        `https://lionfish-app-t784j.ondigitalocean.app/api/getProfileDetails/student/${id}`
      );
      data = await data.json();
      setRollNumber(data.rollNo);
      setCurrentYear(data.year);
      setStudentName(data.name);

      var timetableData = await fetch(
        `https://lionfish-app-t784j.ondigitalocean.app/api/getScheduleStudent/${id}`
      );
      timetableData = await timetableData.json();
      var finalClassess = [];
      timetableData = timetableData.forEach((period) => {
        finalClassess.push({
          name: period.subject,
          time: convertDateTimeIsoToTime(period.start),
          helperTime: currentPeriodHelper(period.start),
        });
      });

      var percent = await fetch(
        `https://lionfish-app-t784j.ondigitalocean.app/api/getStudentPercentage/${id}`
      );
      percent = (await percent.text()).toString();
      setPercent(percent);

      finalClassess.push({
        name: "End of Day",
        time: " 3:55 PM",
        helperTime: "15:55",
      });

      setTimetable([
        {
          day: getCurrentWeekday(),
          classes: finalClassess,
        },
      ]);
      console.log(
        "hitesh" + findCurrentPeriod(finalClassess.map((e) => e.helperTime))
      );
      setcurrentPeriod(
        finalClassess[findCurrentPeriod(finalClassess.map((e) => e.helperTime))]
          .name
      );
    })();
  }, []);

  return (
    <View style={styles.container}>
      <DismissablePopup
        text={bottomText}
        visible={dialogVisible}
        setVisible={(x) => setDialogVisible(x)}
      ></DismissablePopup>
      <Text className="text-lg font-bold text-center">Student Dashboard</Text>
      <Card>
        <Text style={styles.infoText}>Student Name: {studentName}</Text>
        <Text style={styles.infoText}>Current Year: {currentYear}</Text>
        <Text style={styles.infoText}>Roll Number: {rollNumber}</Text>
        <Text style={styles.infoText}>Attendance Percent {percent}%</Text>
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
};

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

export default StudentDashboard;
