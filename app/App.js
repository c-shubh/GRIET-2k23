import { Button } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [count, setCount] = useState(1);
  return (
    <SafeAreaProvider style={styles.container}>
      <Button
        title={`Increment ${count}`}
        onPress={() => setCount(count + 1)}
      />
      <StatusBar style="auto" />
    </SafeAreaProvider>
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
