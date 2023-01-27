import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const CurrentPeriod = (timetable) => {
  const [currentPeriod, setCurrentPeriod] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 8 && currentHour < 10) {
      setCurrentPeriod("Period 1");
    } else if (currentHour >= 10 && currentHour < 12) {
      setCurrentPeriod("Period 2");
    } else if (currentHour >= 12 && currentHour < 14) {
      setCurrentPeriod("Period 3");
    } else {
      setCurrentPeriod("No Current Period");
    }
  }, []);

  return (
    <View style={styles.currentPeriodContainer}>
      <Text style={styles.currentPeriodText}>{currentPeriod}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  currentPeriodContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  currentPeriodText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CurrentPeriod;
