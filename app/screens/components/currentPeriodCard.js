import { Button } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CurrentPeriodCard = ({
  period,
  onViewDetailsPress,
  onMarkAttendancePress,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.periodTitle}>{period}</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={onMarkAttendancePress}
          buttonStyle={{ padding: 16, borderRadius: 5 }}
        >
          <Text style={styles.buttonText}>{"Mark\nAttendance"}</Text>
        </Button>
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
