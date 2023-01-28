import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const CurrentDay = () => {
  const [currentDay, setCurrentDay] = useState("");

  useEffect(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const day = days[currentDate.getUTCDay()];
    setCurrentDay(day);
  }, []);

  return (
    <View style={styles.currentDayContainer}>
      <Text className="text-lg font-bold text-center mt-4">
        Timetable for {currentDay}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  currentDayContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  currentDayText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CurrentDay;
