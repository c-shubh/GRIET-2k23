import React from "react";
import { View, Text, Button } from "react-native";
import { StyleSheet } from "react-native";
const TeacherDashboard = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, teacher!</Text>
      <Button
        title="View Attendance History"
        onPress={() => {
          // navigate to attendance history screen
        }}
      />
    </View>
  );
};

export default TeacherDashboard;

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
