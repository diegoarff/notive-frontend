import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import FolderIcon from "../home/FolderIcon";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "../../context/AuthContext";

const FolderList = ({ folderId, setFolderId }) => {
  const queryClient = useQueryClient();
  const { userId } = useSession();
  const folders = queryClient.getQueryData({ queryKey: ["folders", userId] });

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{ paddingRight: 20 }}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {folders.map((folder) => {
        const handle = () => {
          setFolderId(folder._id);
        };
        return (
          <TouchableOpacity
            key={folder._id}
            style={styles.folder(folder, folderId)}
            onPress={handle}
          >
            <FolderIcon color={folder.color} />
            <Text numberOfLines={1} style={styles.text(folder, folderId)}>
              {folder.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default FolderList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 20,
    marginBottom: 24,
  },
  folder: (folder, folderId) => ({
    borderRadius: 12,
    width: 90,
    paddingVertical: 16,
    paddingHorizontal: 4,
    gap: 8,
    backgroundColor: folderId == folder._id ? "white" : "transparent",
    alignItems: "center",
    justifyContent: "center",
  }),
  text: (folder, folderId) => ({
    color: folderId == folder._id ? "black" : "white",
    fontWeight: folderId == folder._id ? "bold" : 500,
  }),
});
