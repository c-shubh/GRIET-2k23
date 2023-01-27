import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  itemContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
  },
  subjectText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  classText: {
    fontSize: 16,
    color: "gray",
  },
  sectionText: {
    fontSize: 16,
    color: "gray",
  },
  startTimeText: {
    fontSize: 16,
    color: "gray",
  },
});

class TeacherClasses extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.classes.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.subjectText}>Subject: {item.subject}</Text>
            <Text style={styles.classText}>Class: {item.class}</Text>
            <Text style={styles.sectionText}>Section: {item.section}</Text>
            <Text style={styles.startTimeText}>
              Start Time: {item.startTime}
            </Text>
          </View>
        ))}
      </ScrollView>
    );
  }
}

export default TeacherClasses;
