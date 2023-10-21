import { View, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const FolderIcon = ({ color }) => {
  return (
    <View style={styles.container(color)}>
      <Icon name="folder" size={28} color="white" />
    </View>
  );
};

export default FolderIcon;

const styles = StyleSheet.create({
  container: (color) => ({
    width: 52,
    aspectRatio: 1,
    backgroundColor: color,
    padding: 12,
    borderRadius: 12,
  }),
});
