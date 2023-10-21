import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, ScrollView } from "react-native";
import { NotesPage, LoadingModal } from "../../../components";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFolder } from "../../../api/folders";
import HeaderRight from "../../../components/note/HeaderRight";

const folder = () => {
  const router = useRouter();
  const folderData = useLocalSearchParams();
  const queryClient = useQueryClient();

  const deleteFolderMutation = useMutation({
    mutationFn: () => deleteFolder(folderData._id),
    onSuccess: () => {
      queryClient.invalidateQueries("folders");
      queryClient.invalidateQueries("notes");

      router.push({
        pathname: "/",
      });
    },
    onError: (error) => {
      alert("Error deleting folder: ", error);
    },
  });

  const buttons = [
    {
      handle: deleteFolderMutation.mutate,
      backgroundColor: "#F14E4E",
      text: "Delete",
      disabled: deleteFolderMutation.isLoading,
    },
  ];

  return (
    <>
      <LoadingModal visible={deleteFolderMutation.isLoading} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerShadowVisible: false,
            headerTitle: `${folderData.name}`,
            headerRight: () => <HeaderRight buttons={buttons} />,
          }}
        />
        <NotesPage folderIcon={false} folder={folderData} />
      </ScrollView>
    </>
  );
};

export default folder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
});
