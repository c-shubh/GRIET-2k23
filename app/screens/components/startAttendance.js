import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DeviceList from "./teacherDeviceList";

const AttendanceButton = (props) => {
  const [attendanceStarted, setAttendanceStarted] = useState(false);

  const handlePress = () => {
    if (!attendanceStarted) {
      setAttendanceStarted(true);
      props.onStarted();
    } else {
      setAttendanceStarted(false);
      props.onStopped();
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>
          {attendanceStarted ? "Stop Attendance" : "Start Attendance"}
        </Text>
      </TouchableOpacity>
    
    </View>
  );
};

const styles = {
  buttonContainer: {
    backgroundColor: "#00b5ec",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
};

export default AttendanceButton;
