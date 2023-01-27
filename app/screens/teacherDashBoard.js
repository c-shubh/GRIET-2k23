import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { NativeModules, DeviceEventEmitter } from "react-native";
import { requestLocationPermission } from "../permission";
function DeviceList({ devices }) {
  if (devices.length === 0) {
    return (
      <View style={{ alignItems: "center", padding: 20 }}>
        <Text>No student marked attendance</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      {devices.map(({ name, rssi }) => (
        <View key={name} style={{ padding: 10 }}>
          <Text>{name}</Text>
          <Text>Distance: {rssi} rssi </Text>
        </View>
      ))}
    </ScrollView>
  );
}

function NearbyDevicesScreen({ onStartAttendance }) {
  const [devices, setDevices] = useState([]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Button
          title="Start Attendance"
          onPress={async () => {
            const id = await AsyncStorage.getItem("loginId");

            NativeModules.ContactTracerModule.setUserId(id).then((userId) => {
              NativeModules.ContactTracerModule.initialize()
                .then((result) => {
                  return NativeModules.ContactTracerModule.isBLEAvailable();
                })

                .then((isBLEAvailable) => {
                  if (isBLEAvailable) {
                    console.log("ble avail");
                    // BLE is available, continue requesting Location Permission
                    return requestLocationPermission();
                  } else {
                    // BLE is not available, don't do anything furthur since BLE is required
                    console.log("ble not avail");
                  }
                })

                .then((locAvi) => {
                  return NativeModules.ContactTracerModule.tryToTurnBluetoothOn();
                })

                .then((sup) => {
                  if (sup) {
                    console.log("hi");

                    DeviceEventEmitter.addListener("NearbyDeviceFound", (e) => {
                      console.log(e);
                      console.log("hiii");
                      setDevices([...devices, e]);
                    });
                  }
                })

                .then((e) => {
                  NativeModules.ContactTracerModule.enableTracerService();
                });
            });
          }}
        />
      </View>
      <DeviceList devices={devices} />
    </View>
  );
}

export default NearbyDevicesScreen;
