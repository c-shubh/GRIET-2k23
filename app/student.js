import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  NativeModules,
  NativeEventEmitter,
  DeviceEventEmitter,
} from "react-native";
import { useEffect, useState } from "react";
import { requestLocationPermission } from "./permission";
export default function Student() {
  let [rollNum, setRollNum] = useState("");

  useEffect(() => {}, []);

  return (
    <View>
      <TextInput
        value={rollNum}
        onChangeText={setRollNum}
        accessibilityHint={"Roll"}
      ></TextInput>
      <Button
        title="Mark "
        onPress={() => {
          NativeModules.ContactTracerModule.setUserId(rollNum).then(
            (userId) => {
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
                .then(() => {
                  console.log("tuend on");
                })

                .then((e) => {
                  NativeModules.ContactTracerModule.enableTracerService();
                });
            }
          );
        }}
      ></Button>
    </View>
  );
}
