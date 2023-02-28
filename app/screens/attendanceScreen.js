import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { NativeModules, DeviceEventEmitter } from "react-native";
import { requestLocationPermission } from "../permission";
import TeacherDevicesList from "./components/teacherDeviceList";
import AttendanceButton from "./components/startAttendance";

function NearbyDevicesScreen({ route }) {
  const [devices, setDevices] = useState([
    //    { name: "Device 1", checked: false, range: "Short" },
    //   { name: "Device 2", checked: true, range: "Medium" },
    //  { name: "Device 3", checked: false, range: "Long" },
  ]);
  const [submit, setSubmit] = useState(false);
  const classId = route.params.classId;
  useEffect(() => {
    fetch(
      `https://lionfish-app-t784j.ondigitalocean.app/api/getClassStudentRollNos/${classId}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDevices(
          data.map((e) => {
            return {
              name: e,
              checked: false,
              range: "",
            };
          })
        );
      });
  }, []);
  console.log("hitesh" + route.params.classId);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <AttendanceButton
          onStarted={async () => {
            const id = await AsyncStorage.getItem("loginId");

            NativeModules.RnNDAModule.setUserId(id).then((userId) => {
              NativeModules.RnNDAModule.initialize()
                .then((result) => {
                  return NativeModules.RnNDAModule.isBLEAvailable();
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
                  return NativeModules.RnNDAModule.tryToTurnBluetoothOn();
                })

                .then((sup) => {
                  if (sup) {
                    console.log("hi");

                    DeviceEventEmitter.addListener("NearbyDeviceFound", (e) => {
                      console.log(e);
                      console.log("hiii");
                      if (e.name) {
                        var updatedDevices = [...devices];

                        for (var device of updatedDevices) {
                          console.log(device.name);
                          if (
                            device.name.toLowerCase() == e.name.toLowerCase()
                          ) {
                            console.log(device.name + "hwlel");
                            device.range = e.rssi.toString();
                            device.checked = true;
                          }
                        }
                        setDevices(updatedDevices);
                      }
                    });
                  }
                })

                .then((e) => {
                  NativeModules.RnNDAModule.enableTracerService();
                });
            });
          }}
          onStopped={() => {
            NativeModules.RnNDAModule.disableTracerService();
            setSubmit(true);
          }}
        />
      </View>
      <TeacherDevicesList
        classId={classId}
        teacherId={route.params.teacherId}
        periodId={route.params.periodId}
        shouldSubmit={submit}
        setDevicesOuter={(dev) => {
          setDevices(dev);
        }}
        devices={devices}
      />
    </View>
  );
}

export default NearbyDevicesScreen;
