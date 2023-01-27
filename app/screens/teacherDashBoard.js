import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import CurrentPeriod from "./components/currentPeriod";
import CurrentDay from "./components/currentDay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import convertDateTimeIsoToTime from "../utils/utils";
import getCurrentWeekday from "../utils/day";
import CurrentPeriodCard from "./components/currentPeriodCard";
import currentPeriodHelper from "../utils/currentperiodhelper";
import findCurrentPeriod from "../utils/currentPeriod";
import SimpleDialog from "./components/dialog";
import { NativeModules, DeviceEventEmitter } from "react-native";
import { requestLocationPermission } from "../permission";
import TeacherCard from "./components/teacherCard";
const TeacherDashboard = ({ navigation }) => {
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
  const [currentClassId, setCurrentClassID] = useState("");
  useEffect(() => {
    (async function () {
      const id = await AsyncStorage.getItem("loginId");

      var timetableData = await fetch(
        `https://lionfish-app-t784j.ondigitalocean.app/api/getScheduleTeacher/${id}`
      );
      timetableData = await timetableData.json();
      var finalClassess = [];
      timetableData = timetableData.forEach((period) => {
        finalClassess.push({
          name: period.subject,
          time: convertDateTimeIsoToTime(period.start),
          startTime: currentPeriodHelper(period.start),
          section: period.section,
          class: period.branch,
          classId: period.classID,
        });
      });

      finalClassess.push({
        name: "End of Day",
        time: " 3:55 PM",
        startTime: "15:55",
        section: "",
        class: "",
        classId: "",
      });

      setTimetable([
        {
          day: getCurrentWeekday(),
          classes: finalClassess,
        },
      ]);
      console.log(
        "hitesh" + findCurrentPeriod(finalClassess.map((e) => e.startTime))
      );
      setcurrentPeriod(
        finalClassess[findCurrentPeriod(finalClassess.map((e) => e.startTime))]
          .name
      );
      setCurrentClassID(
        finalClassess[findCurrentPeriod(finalClassess.map((e) => e.startTime))]
          .classId
      );
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Student Dashboard</Text>
      <TeacherCard />
      <CurrentDay />

      <ScrollView style={styles.timetableContainer}>
        {timetable.map((day, index) => {
          return (
            <View key={index} style={styles.dayContainer}>
              {day.classes.map((classInfo, classIndex) => (
                <View key={classIndex} style={styles.classContainer}>
                  <Text style={styles.classText}>{classInfo.name}</Text>
                  <Text style={styles.classText}>{classInfo.startTime}</Text>
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
              navigation.navigate("AttendanceScreen", {
                classId: currentClassId,
              });
            }
          }}
        />
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

export default TeacherDashboard;
