import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import Folder from "./Folder";
import { useRouter } from "expo-router";
import { useSession } from "../../context/AuthContext";
import { getFoldersFromUser } from "../../api/folders";
import { useQuery } from "@tanstack/react-query";

const FoldersPage = () => {
  const router = useRouter();
  const { userId } = useSession();

  const { data, isFetching, isError, error } = useQuery(["folders", userId], () => getFoldersFromUser(userId));

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
    return <Text style={styles.text}> There is no folders... </Text>;
  }

  return (
    <View style={styles.container}>
      {data.map((folder) => {
        const handle = () => {
          router.push({ pathname: "/view/folder", params: folder });
        };
        return <Folder folder={folder} key={folder._id} handlePress={handle} />;
      })}
    </View>
  );
};
export default FoldersPage;

const styles = StyleSheet.create({
  container: {
    rowGap: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  error: {
    fontSize: 16,
    color: "#ff0000",
  },
  text: {
    fontSize: 16,
    color: "#888888",
  },
});
