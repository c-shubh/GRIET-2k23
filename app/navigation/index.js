import { createNativeStackNavigator } from "@react-navigation/native-stack";
import splashScreen from "../screens/splashScreen";
import LoginScreen from "../screens/loginScreen";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="splashScreen"
        component={splashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
