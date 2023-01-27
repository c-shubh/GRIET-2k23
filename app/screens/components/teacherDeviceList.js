import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

const DeviceList = () => {
  const [devices, setDevices] = useState([
    { name: 'Device 1', checked: false },
    { name: 'Device 2', checked: true },
    { name: 'Device 3', checked: false },
    // more devices
  ]);

  const toggleCheck = (index) => {
    const updatedDevices = [...devices];
    updatedDevices[index].checked = !updatedDevices[index].checked;
    setDevices(updatedDevices);
  }

  return (
    <ScrollView style={styles.container}>
      {devices.map((device, index) => (
        <TouchableOpacity key={index} onPress={() => toggleCheck(index)}>
          <View style={styles.deviceContainer}>
            <Text style={styles.deviceName}>{device.name}</Text>
            <Image
              source={device.checked ? require('./checked.png') : require('./unchecked.png')}
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
    backgroundColor: 'white'
  },
  deviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5'
  },
  deviceName: {
    fontSize: 18,
    color: '#555',
  },
  checkIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    tintColor: 'orange',
  },
};

export default DeviceList;