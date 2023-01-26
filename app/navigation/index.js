import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/splashScreen";
import LoginScreen from "../screens/loginScreen";
import ChooseTeacherOrStudent from "../screens/chooseTeacherOrStudent";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChooseTeacherOrStudent"
        component={ChooseTeacherOrStudent}
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
