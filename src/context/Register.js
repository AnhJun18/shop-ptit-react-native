import axios from "./axios";
import { createContext, useState } from "react";
import DataStorage from "../common/utility/DataStorage";
import { navigate } from "../navigations/RootNavigation";
import { ToastAndroid } from "react-native";
import { Alert } from "react-native";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const register = async (payload) => {
    return await axios.post(
      axios.defaults.baseURL + "/api/auth/user/register",
      payload
    );

  };

  return (
    <AuthContext.Provider value={{register}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;