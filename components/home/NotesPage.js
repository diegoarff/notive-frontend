import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import Note from "./Note";
import { useRouter } from "expo-router";
import { useSession } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getNotesFromUser } from "../../api/notes";

const NotesPage = ({ folderIcon = true, folder }) => {
  const router = useRouter();
  const { userId } = useSession();

  const { data, isFetching, isError, error } = useQuery(["notes", userId], () => getNotesFromUser(userId));

  if (isFetching) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  if (isError) {
    return <Text style={styles.error}> Error: {error.message} </Text>;
  }

  if (data.length === 0) {
    return <Text style={styles.text}> There is no notes... </Text>;
  }

  return (
    <View style={styles.container}>
      {data
        .filter((note) => !folder || note.folderId == folder._id)
        .map((note) => {
          const handle = () => {
            router.push({
              pathname: "/view/note/[id]",
              params: { id: note._id },
            });
          };

          return (
            <Note
              folderIcon={folderIcon}
              note={note}
              handlePress={handle}
              key={note._id}
            />
          );
        })}
    </View>
  );
};

export default NotesPage;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#888888",
  },
  error: {
    fontSize: 16,
    color: "#ff0000",
  },
});
