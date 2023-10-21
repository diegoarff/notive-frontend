import { Redirect, Stack } from "expo-router";
import { SafeAreaView, ActivityIndicator } from "react-native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useSession } from "../../context/AuthContext";
import { useState, useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const AppLayout = () => {
  const { session, userId, isLoading, onLogout } = useSession();
  const [isTimeoutLoading, setIsTimeoutLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTimeoutLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading || isTimeoutLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#000000" />
      </SafeAreaView>
    );
  }

  if (!session || !userId) {
    return <Redirect href="/login" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  );
};

export default AppLayout;
