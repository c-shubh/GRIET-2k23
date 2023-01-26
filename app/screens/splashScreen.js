import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import React from "react";

export default function splashScreen({ navigation }) {
  return (
    <View>
      <Text>splashScreen</Text>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.buttontext}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    width: "100%",
    backgroundColor: "#1A759F",
    padding: 20,
    borderRadius: 16,
  },
  buttontext: {
    fontSize: 24,
    color: "white",
    fontWeight: "600",
  },
});
