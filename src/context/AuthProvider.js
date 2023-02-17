import axios from "./axios";
import { createContext, useState } from "react";
import DataStorage from "../common/utility/DataStorage";
import { navigate } from "../navigations/RootNavigation";
import { ToastAndroid } from "react-native";
import { Alert } from "react-native";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(async () => {
    const info = await DataStorage.GetDataStorage(['@userInfo']);
    return info ? info : null
  });

  const login = async (payload) => {
    return await axios.post(
      axios.defaults.baseURL + "/api/auth/user/login",
      payload
    );

  };
  const logout = async () => {
    await DataStorage.RemoveDataStorage(['@accessToken', '@refreshToken', '@userInfo']);
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;