import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-red">
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
