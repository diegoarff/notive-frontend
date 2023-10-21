import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import FolderIcon from "./FolderIcon";
import { useSession } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getFoldersFromUser } from "../../api/folders";

const Note = ({ folderIcon = false, note, handlePress }) => {
  const { userId } = useSession();
  const { data } = useQuery(["folders", userId], () => getFoldersFromUser(userId))

  const getColorFromFolder = (folderId) => {
    const folder = data.find((folder) => folder._id === folderId);
    const color = folder?.color || "#333333";
    return color;
  };

  return (
    <TouchableOpacity
      style={styles.container(getColorFromFolder(note.folderId))}
      onPress={handlePress}
    >
      <View style={styles.topContainer}>
        <View style={styles.folderTextContainer}>
          {folderIcon ? (
            <FolderIcon color={getColorFromFolder(note.folderId)} />
          ) : null}
          <View style={{ width: 242 }}>
            <Text style={styles.title} numberOfLines={1}>
              {note.title}
            </Text>
            <Text style={styles.date} numberOfLines={1}>
              {new Date(note.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 16 }} numberOfLines={2}>
          {note.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Note;

const styles = StyleSheet.create({
  container: (color) => ({
    padding: 16,
    backgroundColor: `${color}20`,
    borderRadius: 12,
    gap: 12,
  }),
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  folderTextContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  date: {
    fontSize: 16,
    color: "grey",
  },
});
