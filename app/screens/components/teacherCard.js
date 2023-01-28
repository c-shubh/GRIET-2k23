import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "@rneui/base";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const TeacherCard = () => {
  const [teacherData, setTeacherData] = useState({});

  useEffect(() => {
    AsyncStorage.getItem("loginId").then((id) => {
      fetch(
        `https://lionfish-app-t784j.ondigitalocean.app/api/getProfileDetails/teacher/${id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setTeacherData(data);
        });
    });
  }, []);

  return (
    <Card>
      <Text style={styles.infoText}>Teacher Name: {teacherData.name}</Text>
      <Text style={styles.infoText}>Username: {teacherData.teacherID}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default TeacherCard;
