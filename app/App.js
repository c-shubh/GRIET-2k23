import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import MyStack from "./navigation/index";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
