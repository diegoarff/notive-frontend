import { ScrollView, SafeAreaView, StyleSheet, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import {
  ProfileIcon,
  Navbar,
  NotesPage,
  FoldersPage,
  CreateButton,
} from "../../components";
import { useState } from "react";

const Index = () => {
  const router = useRouter();

  const tabs = ["Folders", "Notes"];

  const [activeTab, setActiveTab] = useState("Folders");

  const handleCreatePress = () => {
    if (activeTab === "Notes") {
      router.push("/create/note");
    } else {
      router.push("/create/folder");
    }
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case "Notes":
        return <NotesPage />;
      case "Folders":
        return <FoldersPage />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
          headerTitle: "Home",
          headerRight: () => (
            <ProfileIcon
              handlePress={() => {
                router.push("/profile");
              }}
            />
          ),
        }}
      />
      <Navbar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <ScrollView
        style={styles.scrollArea}
        showsVerticalScrollIndicator={false}
      >
        {displayTabContent()}
      </ScrollView>
      <View style={styles.createButton}>
        <CreateButton handlePress={handleCreatePress} />
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 20,
    position: "relative",
  },
  scrollArea: {
    marginTop: 20,
  },
  createButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
