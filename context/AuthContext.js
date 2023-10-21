import { useContext, createContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { api, authApi } from "../api/axios";
import { useStorageState } from "../hooks/useStorageState";

const AuthContext = createContext(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[isUserLoading, userId], setUserId] = useStorageState("userId");

  // Check if the token is expired
  useEffect(() => {
    if (session) {
      const { exp } = jwtDecode(session);
      if (Date.now() >= exp * 1000) {
        setSession(null);
      }
    }
    api.defaults.headers.common["Authorization"] = `Bearer ${session}`;
  }, [session]);

  const login = async (data) => {
    try {
      const response = await authApi.post("/login", data);
      const { token, userId } = response.data.data;

      await setSession(token);
      await setUserId(userId);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return response.data.data;
    } catch (error) {
      return { error: true, msg: error.response.data.msg };
    }
  };

  const register = async (data) => {
    try {
      return await authApi.post("/register", data);
    } catch (error) {
      return { error: true, msg: error.response.data.msg };
    }
  };

  const logout = async () => {
    setSession(null);
    setUserId(null);
  };

  const value = {
    userId,
    session,
    isLoading,
    onLogin: login,
    onRegister: register,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
