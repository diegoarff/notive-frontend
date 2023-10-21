import { useLocalSearchParams, useRouter } from "expo-router";
import { Template, LoadingModal } from "../../../../components";
import { useEffect, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateNote } from "../../../../api/notes";
import { useSession } from "../../../../context/AuthContext";

const note = () => {
  const router = useRouter();
  const { id: noteId } = useLocalSearchParams();
  const { userId } = useSession();

  const queryClient = useQueryClient();

  const notes = queryClient.getQueryData({ queryKey: ["notes", userId] });

  const note = notes?.find((note) => note._id === noteId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [folderId, setFolderId] = useState("");

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setFolderId(note.folderId);
  }, [note]);

  const updateNoteMutation = useMutation({
    mutationFn: () => updateNote(noteId, { title, content, folderId }),
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
      router.push({
        pathname: "/",
      });
    },
    onError: (error) => {
      alert("Error updating note: ", error);
    },
  });
  const handle = () => {
    if (
      title.length > 0 &&
      title.length < 51 &&
      content.length > 0 &&
      content.length < 2001
    ) {
      updateNoteMutation.mutate();
    } else {
      alert(
        "Title must be between 1 and 50 characters and content must be between 1 and 2000 characters"
      );
    }
  };
  const buttons = [
    {
      handle: handle,
      backgroundColor: "black",
      text: "Save",
      disabled: updateNoteMutation.isLoading,
    },
  ];

  return (
    <>
      <LoadingModal visible={updateNoteMutation.isLoading} />

      <Template
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        folderId={folderId}
        setFolderId={setFolderId}
        buttons={buttons}
        isView={false}
        headerTitle={"Edit note"}
      />
    </>
  );
};

export default note;
