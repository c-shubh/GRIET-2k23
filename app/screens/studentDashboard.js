import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { StyleSheet } from "react-native";
const StudentDashboard = ({ route }) => {
  const [studentApiDetails, setstudentApiDetails] = useState({});
  useEffect(() => {
    (async function () {
      const id = await AsyncStorage.getItem("loginId");
      console.log("vk_12 " + id);
      var data = await fetch(
        `https://lionfish-app-t784j.ondigitalocean.app/api/getProfileDetails/student/${id}`
      );
      data = await data.json();
      setstudentApiDetails(data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {studentApiDetails.name}</Text>
      <Button
        title="View Attendance History"
        onPress={() => {
          // navigate to attendance history screen
        }}
      />
    </View>
  );
};

export default StudentDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scheduleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  scheduleText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
