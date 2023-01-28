import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const DismissablePopup = ({ visible, setVisible, text }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.popupContainer}>
        <View style={styles.popup}>
          <Text style={styles.popupText}>{text}</Text>
          <TouchableOpacity style={styles.okButton} onPress={() => setVisible(false)}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#4286f4',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  popupContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  popupText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#4286f4',
    padding: 10,
    borderRadius: 5,
  },
  okButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
export default DismissablePopup;