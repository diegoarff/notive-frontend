import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/Feather";

const CreateButton = ({ handlePress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Icon name="plus" size={36} color="white" />
    </TouchableOpacity>
  );
};

export default CreateButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 64,
    aspectRatio: 1,
    backgroundColor: "#000000",
    borderRadius: 50,
  },
});
