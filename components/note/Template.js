import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Stack } from "expo-router";
import HeaderRight from "../../components/note/HeaderRight";
import FolderList from "./FolderList";

const Template = ({
  title = "",
  setTitle,
  content = "",
  setContent,
  folderId,
  setFolderId,
  buttons,
  headerTitle,
  isView,
  updatedAt,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
          headerTitle: headerTitle,
          headerRight: () => <HeaderRight buttons={buttons} />,
        }}
      />
      <TextInput
        multiline={true}
        editable={!isView}
        style={styles.title}
        onChangeText={setTitle}
        value={title}
        placeholder="Title"
      />
      <ScrollView style={styles.scrollArea}>
        <TextInput
          multiline={true}
          editable={!isView}
          onChangeText={setContent}
          value={content}
          placeholder="Begin writing here..."
          style={styles.content}
        />
      </ScrollView>

      <View>
        {isView ? (
          <Text style={styles.date}>
            Last modified at:{" "}
            {new Date(updatedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        ) : (
          <FolderList folderId={folderId} setFolderId={setFolderId} />
        )}
      </View>
    </SafeAreaView>
  );
};
export default Template;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  scrollArea: {
    marginVertical: 20,
  },
  title: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    color: "black",
    fontSize: 16,
  },
  date: {
    color: "#6D6D6D",
    marginBottom: 30,
  },
});
