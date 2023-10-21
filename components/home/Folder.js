import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Folder = ({ folder, handlePress }) => {
  return (
    <TouchableOpacity style={styles.container(folder.color)} onPress={handlePress}>
      <MaterialIcons name="folder" size={80} color={folder.color} />
      <Text style={styles.name} numberOfLines={1}>
        {folder.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Folder;

const styles = StyleSheet.create({
  container: (color) => ({
    backgroundColor: `${color}20`,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    width: 175,
    height: 1,
    aspectRatio: 1,
    borderRadius: 12,
  }),
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
