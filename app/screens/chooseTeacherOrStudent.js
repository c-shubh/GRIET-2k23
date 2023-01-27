import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ChooseTeacherOrStudent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("LoginScreen", {type: "Teacher"})}
      >
        <Image
          source={require("../assets/teacher.png")}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>Teacher</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("LoginScreen", {type: "Student"})}
      >
        <Image
          source={require("../assets/student.png")}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>Student</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChooseTeacherOrStudent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row", // Change the layout direction to row
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1, // Use flex to make buttons fill the available space
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  buttonImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
});
