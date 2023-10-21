import { Slot } from "expo-router";
import { SessionProvider } from "../context/AuthContext";

const Root = () => {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
};

export default Root;
