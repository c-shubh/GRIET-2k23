import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Dialog } from "@rneui/themed";
import { TabRouter } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginScreen = ({ navigation, route }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [visible1, setVisible1] = useState(false);
  const handleIdChange = (text) => {
    setId(text);
  };
  useEffect(() => {
    AsyncStorage.getItem("loginType").then((res) => {
      if (res != null) {
        if (res == "Student") {
          navigation.navigate("StudentDashboard");
        } else {
          navigation.navigate("TeacherDashboard");
        }
      }
    });
  }, []);

  const toggleDialog1 = () => {
    setVisible1(!visible1);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleForgetPassword = () => {
    // Code to handle forget password action
  };

  const handleLogin = async () => {
    console.log("handling");
    console.log("rpm" + route.params.type);
    console.log("hiotesh" + route.params.toString());
    const req = await fetch(
      "https://lionfish-app-t784j.ondigitalocean.app/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: route.params.type,
          id: id,
          password: password,
        }),
      }
    );

    const res = await req.json();
    console.log(res);
    if (res.status === "false") {
      toggleDialog1();
    } else {
      await AsyncStorage.setItem("loginId", id);
      await AsyncStorage.setItem("loginType", route.params.type);
      console.log("login succ");
      if (route.params.type === "Student") {
        console.log("Student login successfully");

        navigation.navigate("StudentDashboard", {
          type: "Student",
        });
      } else {
        console.log("Teacher login successfully");
        navigation.navigate("TeacherDashboard", {
          type: "Teacher",
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.type} Login</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder={
            route.params.type === "Teacher"
              ? "Enter Teacher ID"
              : "Enter Roll no"
          }
          value={id}
          onChangeText={handleIdChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Forget Password"
            onPress={handleForgetPassword}
            color="#6200ee"
          />
          <Button title="Login" onPress={handleLogin} color="#6200ee" />
        </View>
        <Dialog isVisible={visible1} onBackdropPress={toggleDialog1}>
          <Dialog.Title title="Message" />
          <Text>Incorrect Password</Text>
          <Dialog.Actions>
            <Dialog.Button title="OK" onPress={toggleDialog1} />
          </Dialog.Actions>
        </Dialog>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#6200ee",
  },
  formContainer: {
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#6200ee",
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
});

export default LoginScreen;
