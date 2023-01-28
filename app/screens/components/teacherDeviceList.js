import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ShadowPropTypesIOS,
} from "react-native";

const DeviceList = (props) => {
  console.log(props.toString() + "hiiyy");
  
  const devices = props.devices;

  useEffect(() => {

    if(props.shouldSubmit) {
      // send post request
      // periodId
      // teacherId
      // classId
      var periodId = props.periodId;
      var teacherId = props.teacherId;
      var classID = props.classId;
      var studentRollNumbers = {};

      devices.forEach((e) => {
        studentRollNumbers[`${e.name}`] = e.checked; 
      });
      fetch("https://lionfish-app-t784j.ondigitalocean.app/api/submitAttendanceForClass",
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          periodID: periodId,
          teacherID: teacherId,
          classID: classID,
          date: Date.now(),
          studentRollNumbers: studentRollNumbers
        }),
      }
      )
      
    }
  }, [props.shouldSubmit])

  const toggleCheck = (index) => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to toggle the checkbox?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            const updatedDevices = [...devices];
            updatedDevices[index].checked = !updatedDevices[index].checked;
            props.setDevicesOuter(updatedDevices);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const presentStudents = devices.filter((d) => d.checked).length;
  const absentees = devices.filter((d) => !d.checked).length;
  const totalStudents = devices.length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Present Students: {presentStudents}
        </Text>
        <Text style={styles.headerText}>Absentees: {absentees}</Text>
        <Text style={styles.headerText}>Total Students: {totalStudents}</Text>
      </View>
      {devices.map((device, index) => (
        <TouchableOpacity key={index} onPress={() => toggleCheck(index)}>
          <View style={styles.deviceContainer}>
            <View style={styles.deviceInfo}>
              <Text style={styles.deviceName}>{device.name}</Text>
              <Text style={styles.range}>{device.range}</Text>
            </View>
            <Image
              source={
                device.checked
                  ? require("../../assets/chcked.png")
                  : require("../../assets/unchcked.png")
              }
              style={styles.checkIcon}
            />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
const styles = {
  container: {
    backgroundColor: "white",
  },
  deviceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  deviceInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  deviceName: {
    fontSize: 18,
    color: "#555",
  },
  range: {
    fontSize: 14,
    color: "#555",
  },
  checkIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  countText: {
    fontSize: 18,
    color: "#555",
    marginRight: 10,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

export default DeviceList;
