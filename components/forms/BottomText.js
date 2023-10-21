import { Link } from "expo-router";
import { Text, StyleSheet } from "react-native";

const BottomText = ({ label, UrlText, Page }) => {
  return (
    <Text style={styles.text}>
      {label + " "}
      <Link replace style={styles.link} href={Page}>
        {UrlText}
      </Link>
    </Text>
  );
};
export default BottomText;

const styles = StyleSheet.create({
  text: { color: "#6D6D6D" },
  link: {
    color: "red",
    textDecorationLine: "underline",
  },
});
