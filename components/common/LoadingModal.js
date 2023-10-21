import {
  StyleSheet,
  View,
  ActivityIndicator,
  Modal,
  SafeAreaView,
} from "react-native";
import React from "react";

const LoadingModal = ({ animationType = "fade", visible }) => {
  return (
    <Modal transparent={true} animationType={animationType} visible={visible}>
      <SafeAreaView style={styles.outer}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000060",
  },
  container: {
    width: 200,
    paddingVertical: 40,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
