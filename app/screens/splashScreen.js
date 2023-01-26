import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

export default function SplashScreen({ navigation }) {
  setTimeout(() => {
    navigation.navigate("ChooseTeacherOrStudent");
    // seconds timeout
  }, 2500);
  return (
    <View style={styles.container}>
      <Image source={require("../assets/splashbg.png")} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "cover",
  },
});
