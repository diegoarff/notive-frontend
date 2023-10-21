import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const HeaderRight = ({ buttons = [] }) => {
  return (
    <View
      style={styles.container}
    >
      {buttons.map((button, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={button.handle}
          style={styles.button(button)}
          disabled={button.disabled}
        >
          <Text style={styles.buttonText}>{button.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  button: (button) => ({
    backgroundColor: button.backgroundColor,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
