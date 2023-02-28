import { API_URL } from "../globals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  FormControl,
  HStack,
  Heading,
  Input,
  VStack,
  themeColors,
} from "native-base";
import React, { useEffect, useState } from "react";

export default function LoginScreen({ navigation, route }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [visible1, setVisible1] = useState(false);
  const handleIdChange = (text) => {
    setId(text);
  };
  useEffect(() => {
    console.log("async storage get loginType");
    AsyncStorage.getItem("loginType").then((res) => {
      if (res != null) {
        console.log(`async storage got loginType: ${res}`);
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
    const req = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: route.params.type,
        id: id,
        password: password,
      }),
    });

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
    <VStack
      space={"8"}
      flex={"1"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading size={"xl"}>{route.params.type} Login</Heading>
      <VStack space={"4"} w="xs" bg="white" borderRadius={"8"} p="4">
        <FormControl isRequired>
          <FormControl.Label>
            {route.params.type.toLowerCase() === "teacher"
              ? "Teacher ID"
              : "Roll no"}
          </FormControl.Label>
          <Input
            /* https://github.com/GeekyAnts/NativeBase/issues/5420#issuecomment-1364651787 */
            _input={{ cursorColor: "#303030", selectionColor: "#30303080" }}
            placeholder={
              route.params.type === "Teacher"
                ? "Enter Teacher ID"
                : "Enter Roll no"
            }
            value={id}
            onChangeText={handleIdChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            /* https://github.com/GeekyAnts/NativeBase/issues/5420#issuecomment-1364651787 */
            _input={{ cursorColor: "#303030", selectionColor: "#30303080" }}
            placeholder="Enter Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={true}
          />
        </FormControl>

        <HStack justifyContent={"space-between"}>
          <Button onPress={handleForgetPassword}>Forget Password</Button>
          <Button onPress={handleLogin}>Login</Button>
        </HStack>
      </VStack>
    </VStack>
  );
}
