import { StyleSheet } from "react-native";
import { useState } from "react";
import { Template, LoadingModal } from "../../../components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { createNote } from "../../../api/notes";

const note = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [folderId, setFolderId] = useState("");

  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: () =>
      createNote({
        title,
        content,
        folderId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
      router.push({
        pathname: "/",
      });
    },
    onError: (error) => {
      alert("Error creating note: ", error);
    },
  });

  const handle = () => {
    if (
      title.length > 0 &&
      title.length < 51 &&
      content.length > 0 &&
      content.length < 2001
    ) {
      createNoteMutation.mutate();
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
      disabled: createNoteMutation.isLoading,
    },
  ];

  return (
    <>
      <LoadingModal visible={createNoteMutation.isLoading} />

      <Template
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        folderId={folderId}
        setFolderId={setFolderId}
        buttons={buttons}
        isView={false}
        headerTitle={"Create note"}
      />
    </>
  );
};

export default note;

const styles = StyleSheet.create({});
