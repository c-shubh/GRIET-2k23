import {
  Button,
  StyleSheet,
  Text,
  View,
  TextField,
  NativeEventEmitter,
  NativeModules,
  DeviceEventEmitter,
} from "react-native";
import { useEffect, useState } from "react";
import { requestLocationPermission } from "./permission";

export default function Teacher() {
  const [devices, setDevices] = useState(["devices displayed here"]);

  useEffect(() => {
    NativeModules.ContactTracerModule.setUserId("teacher123").then((userId) => {
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
            DeviceEventEmitter.addListener("AdvertiserMessage", (e) => {
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
  }, []);

  return (
    <View>
      <Button
        onPress={() => {
          SpecialBle.getConfig((config) => {
            SpecialBle.startBLEScan(config);
          });
        }}
        title="Start Attendance"
      ></Button>
      <Text>{devices.toString()}</Text>
    </View>
  );
}
