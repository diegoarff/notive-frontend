import { Redirect, Stack } from "expo-router";
import { useSession } from "../../context/AuthContext";

const AppLayout = () => {
  const { session, userId } = useSession();

  if (session && userId) {
    return <Redirect href="/" />;
  }

  return <Stack />;
};

export default AppLayout;
