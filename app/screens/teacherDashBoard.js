import { API_URL } from "../globals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  findCurrentPeriod,
  currentPeriodHelper,
  getCurrentWeekday,
  convertDateTimeIsoToTime,
} from "../utils";
import CurrentDay from "./components/currentDay";
import CurrentPeriodCard from "./components/currentPeriodCard";
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
  const [teacherId, setTeacherId] = useState("");
  useEffect(() => {
    (async function () {
      const id = await AsyncStorage.getItem("loginId");
      setTeacherId(id);
      var timetableData = await fetch(
        `${API_URL}/api/getScheduleTeacher/${id}`
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
      <Text style={styles.headerText}>Teacher Dashboard</Text>
      <TeacherCard />
      <CurrentDay />

      <ScrollView>
        <Card className="border-2" containerStyle={{ marginTop: 0 }}>
          {timetable.map((day, index) => {
            return (
              <View key={index} style={styles.dayContainer}>
                {day.classes.map((classInfo, classIndex) => (
                  <View key={classIndex} style={styles.classContainer}>
                    <Text style={styles.classText}>
                      {classInfo.name} - {classInfo.class}-{classInfo.section}
                    </Text>
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
                  teacherId: teacherId,
                  periodId: currentPeriod,
                });
              }
            }}
          />
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
  dayContainer: {
    marginBottom: 10,
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
