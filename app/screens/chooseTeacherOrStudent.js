import { Heading, Image, Pressable, Stack, Text } from "native-base";

const ImageButton = ({ type, image, navigation }) => {
  return (
    <Pressable
      _pressed={{ opacity: "0.5" }}
      onPress={() => navigation.navigate("LoginScreen", { type: type })}
    >
      <Stack bg={"white"} borderRadius={"8"} space="2" p="8">
        <Image source={image} alt="" width={"100"} height={"100"} />
        <Text fontSize={"2xl"}>{type}</Text>
      </Stack>
    </Pressable>
  );
};

export default function ChooseTeacherOrStudent({ navigation }) {
  return (
    <Stack
      space={"8"}
      alignItems={"center"}
      flex={"1"}
      justifyContent={"center"}
    >
      <Heading size="3xl" textAlign={"center"}>
        Login
      </Heading>
      <ImageButton
        type={"Teacher"}
        image={require("../assets/teacher.png")}
        navigation={navigation}
      />
      <ImageButton
        type={"Student"}
        image={require("../assets/student.png")}
        navigation={navigation}
      />
    </Stack>
  );
}
