import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Button = ({ handler, label, disabled, warning = false }) => {
  return (
    <TouchableOpacity
      onPress={handler}
      disabled={disabled}
      style={[
        styles.container,
        warning ? styles.warningColor : styles.defaultColor,
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 100,
    width: "100%",
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  defaultColor: {
    backgroundColor: "black",
  },
  warningColor: {
    backgroundColor: "#F14E4E",
  },
});
