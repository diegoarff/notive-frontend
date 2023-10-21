import { useLocalSearchParams, useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../../../api/notes";
import { Template, LoadingModal } from "../../../../components";
import { useSession } from "../../../../context/AuthContext";

const note = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { userId } = useSession();

  const { id: noteId } = useLocalSearchParams();

  const notes = queryClient.getQueryData({ queryKey: ["notes", userId] });

  const note = notes?.find((note) => note._id === noteId);

  const deleteNoteMutation = useMutation({
    mutationFn: () => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
      router.push({
        pathname: "/",
      });
    },
    onError: (error) => {
      alert("Error deleting note: ", error);
    },
  });

  const goToEdit = () => {
    router.push({
      pathname: "/edit/note/[id]",
      params: { id: noteId },
    });
  };

  const buttons = [
    {
      handle: goToEdit,
      backgroundColor: "black",
      text: "Edit",
    },
    {
      handle: deleteNoteMutation.mutate,
      backgroundColor: "#F14E4E",
      text: "Delete",
      disabled: deleteNoteMutation.isLoading,
    },
  ];

  return (
    <>
      <LoadingModal visible={deleteNoteMutation.isLoading} />

      <Template
        title={note?.title}
        content={note?.content}
        updatedAt={note?.updatedAt}
        buttons={buttons}
        isView={true}
        headerTitle={""}
      />
    </>
  );
};

export default note;
