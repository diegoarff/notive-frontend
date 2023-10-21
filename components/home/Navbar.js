import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Navbar = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        return (
          <TouchableOpacity
            onPress={() => setActiveTab(tab)}
            key={tab}
            style={styles.button}
          >
            <Text style={styles.text(activeTab, tab)}>{tab}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "black",
    borderRadius: 100,
  },
  button: {
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  text: (activeTab, tab) => ({
    fontSize: 20,
    color: activeTab === tab ? "white" : "grey",
    fontWeight: "bold",
  }),
});
