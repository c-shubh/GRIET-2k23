import AsyncStorage from "@react-native-async-storage/async-storage";
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
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.title}>Teacher Name: {teacherData.name}</Text>
          <Text style={styles.subtitle}>Username: {teacherData.teacherId}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "80%",
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
  },
});

export default TeacherCard;
