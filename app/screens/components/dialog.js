import React, { useState } from "react";
import { Modal, Text, View, TouchableOpacity } from "react-native";

function SimpleDialog({ visible, message, onClose }) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Text>{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default SimpleDialog;
