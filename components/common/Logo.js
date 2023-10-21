import { StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/Feather";

import React from "react";

const Logo = () => {
  return (
    <View style={styles.container}>
      <Icon name="file-text" size={40} />
      <Text style={styles.text}>Notive</Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
