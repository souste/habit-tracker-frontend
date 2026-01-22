import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      const response = await getMe();

      if (response.error) {
        logout();
      } else {
        setUser(response.data.user);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const refreshUser = async () => {
    const response = await getMe();
    console.log("get user", response);
    if (response.error) {
      logout();
      return false;
    }
    setUser(response.data.user);
    return true;
  };

  return <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
