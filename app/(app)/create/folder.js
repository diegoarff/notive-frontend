import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import React, { useState } from "react";
import {
  Button,
  InputForm,
  AvoidKeyboard,
  LoadingModal,
} from "../../../components";
import { Stack, useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFolder } from "../../../api/folders";
import Validator from "../../validations";

const colors = [
  "#FF0000", // Red
  "#FF7F00", // Orange-red
  "#FF8C00", // Dark orange
  "#FFA500", // Orange
  "#FFD700", // Goldenrod
  "#fff200", // Yellow
  "#ADFF2F", // Greenish-yellow
  "#7FFF00", // Lime
  "#00FF00", // Green
  "#00FF7F", // Cyan
  "#00FFFF", // Cyan-blue
  "#00BFFF", // Sky blue
  "#0080FF", // Royal blue
  "#0041FF", // Dark blue
  "#4B0082", // Indigo
  "#8000FF", // Purple
  "#EE82EE", // Violet
  "#DA70D6", // Orchid
  "#C71585", // Medium violet-red
  "#FFC0CB", // Pink
];

const folder = () => {
  const [name, setName] = useState("");
  const [folderColor, setFolderColor] = useState(colors[0]);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState({});
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const FolderValidator = new Validator(handleError);

  const createFolderMutation = useMutation({
    mutationFn: () => createFolder({ name, color: folderColor }),
    onSuccess: () => {
      queryClient.invalidateQueries("folders");
      router.push({
        pathname: "/",
      });
    },
    onError: (error) => {
      alert("Error creating folder: ", error);
    },
  });

  const handleCreateFolder = () => {
    let ValName = FolderValidator.ValidateName(name, "Folder name");
    if (ValName == true) {
      try {
        createFolderMutation.mutate();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <LoadingModal visible={createFolderMutation.isLoading} />

      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerShadowVisible: false,
            headerTitle: "Create folder",
          }}
        />
        <AvoidKeyboard>
          <View style={styles.mainContainer}>
            <InputForm
              label="Folder name"
              value={name}
              setter={setName}
              errors={errors}
            />
            <Text style={styles.text}>Select color</Text>
            <View style={styles.colorsContainer}>
              {colors.map((color, idx) => {
                return (
                  <TouchableOpacity
                    key={idx}
                    style={styles.color(color, folderColor)}
                    onPress={() => setFolderColor(color)}
                  ></TouchableOpacity>
                );
              })}
            </View>
            <Button
              label="Create folder"
              handler={handleCreateFolder}
              disabled={createFolderMutation.isLoading}
            />
          </View>
        </AvoidKeyboard>
      </SafeAreaView>
    </>
  );
};

export default folder;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  color: (color, folderColor) => ({
    height: 50,
    aspectRatio: 1,
    backgroundColor: color,
    borderRadius: 40,
    borderWidth: color == folderColor ? 3 : 0,
    borderColor: "black",
  }),
  colorsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
    marginBottom: 20,
  },
  text: {
    fontWeight: "bold",
  },
});
