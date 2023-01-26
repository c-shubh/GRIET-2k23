import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Teacher from "./teacher";
import Student from "./student";
import { useEffect } from "react";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Teacher"
        onPress={() => navigation.navigate("teacher")}
      ></Button>

      <Button
        title="Student"
        onPress={() => navigation.navigate("student")}
      ></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={HomeScreen}></Stack.Screen>

        <Stack.Screen name="teacher" component={Teacher}></Stack.Screen>
        <Stack.Screen name="student" component={Student}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
