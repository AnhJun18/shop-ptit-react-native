import axios from "./axios";
import { createContext, useState } from "react";
import DataStorage from "../common/utility/DataStorage";
 
const AuthContext = createContext();
 
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // 
    return null;
  });
 
 
  const login = async (payload) => {
    console.log('c')
    const apiResponse = await axios.post(
      axios.defaults.baseURL + "/api/auth/user/login",
      payload
    );
    console.log(apiResponse.data)
    // if(apiResponse.data.data.status === true){
    //   localStorage.setItem("tokens", JSON.stringify(apiResponse.data));
    //   window.location.href = "/";
    // }
    // else
    //   apiResponse.data.data.message.startsWith("Invalid")?toast.error("Tên đăng nhập hoặc mật khẩu không chính xác"):toast.error(apiResponse.data.data.message)


  };
  const logout = async () => {
    await DataStorage.RemoveDataStorage(['@accessToken','@refreshToken','@userInfo']);
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>

      {children}
    </AuthContext.Provider>
  );
};
 
export default AuthContext;