import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

const DeviceList = () => {
  const [devices, setDevices] = useState([
    { name: "Device 1", checked: false, range: "Short" },
    { name: "Device 2", checked: true, range: "Medium" },
    { name: "Device 3", checked: false, range: "Long" },
    // more devices
  ]);

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
            setDevices(updatedDevices);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container}>
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
};

export default DeviceList;
