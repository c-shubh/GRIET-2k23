import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import MyStack from "./navigation/index";

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
  /*
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={HomeScreen}></Stack.Screen>

        <Stack.Screen name="teacher" component={Teacher}></Stack.Screen>
        <Stack.Screen name="student" component={Student}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
  */
}
