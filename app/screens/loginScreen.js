import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

const LoginScreen = (props) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = (text) => {
    setId(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleForgetPassword = () => {
    // Code to handle forget password action
  };

  const handleLogin = async () => {
    const data = await fetch(
      "https://griet-2k22-server.onrender.com/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Student",
          id: id,
          password: password,
        }),
      }
    );
    // const url =
    //   "https://griet-2k22-server.onrender.com/api/getProfileDetails/student/21b81a3312";
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // do something with data
    //     console.log(data);
    //   })
    //   .catch((rejected) => {
    //     console.log(rejected);
    //   });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Login</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Roll number"
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
