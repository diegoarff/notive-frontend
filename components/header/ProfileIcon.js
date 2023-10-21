import Icon from "@expo/vector-icons/Feather";
import { TouchableOpacity, StyleSheet } from "react-native";

const ProfileIcon = ({ handlePress }) => {
  return (
    <TouchableOpacity style={styles.profile} onPress={handlePress}>
      <Icon name="user" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default ProfileIcon;

const styles = StyleSheet.create({
  profile: {
    width: 40,
    aspectRatio: 1,
    backgroundColor: "black",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
