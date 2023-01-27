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
      <Text style={styles.headerText}>Student Dashboard</Text>
      <View style={styles.studentInfoContainer}>
        <Text style={styles.infoText}>Student Name: {studentName}</Text>
        <Text style={styles.infoText}>Current Year: {currentYear}</Text>
        <Text style={styles.infoText}>Roll Number: {rollNumber}</Text>
      </View>
      <CurrentDay />

      <ScrollView style={styles.timetableContainer}>
        {timetable.map((day, index) => {
          return (
            <View key={index} style={styles.dayContainer}>
              {day.classes.map((classInfo, classIndex) => (
                <View key={classIndex} style={styles.classContainer}>
                  <Text style={styles.classText}>{classInfo.name}</Text>
                  <Text style={styles.classText}>{classInfo.helperTime}</Text>
                </View>
              ))}
            </View>
          );
        })}
        <CurrentPeriodCard
          period={currentPeriod}
          onMarkAttendancePress={() => {
            if (currentPeriod == "End of Day") {
              setBottomText("failed, reason: day already ended");
            } else setBottomText("Attendance Marked!");
          }}
        />
        <Text>{bottomText}</Text>
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
