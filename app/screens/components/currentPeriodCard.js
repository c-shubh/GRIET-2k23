import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CurrentPeriodCard = ({
  period,
  onViewDetailsPress,
  onMarkAttendancePress,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.periodTitle}>{period}</Text>
      <View style={styles.buttonContainer}>
  
        <TouchableOpacity
          style={styles.markAttendanceButton}
          onPress={onMarkAttendancePress}
        >
          <Text style={styles.buttonText}>Mark Attendance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  periodTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  viewDetailsButton: {
    backgroundColor: "#4287f5",
    padding: 12,
    borderRadius: 5,
    width: "49%",
  },
  markAttendanceButton: {
    backgroundColor: "#4287f5",
    padding: 12,
    borderRadius: 5,
    width: "49%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default CurrentPeriodCard;
