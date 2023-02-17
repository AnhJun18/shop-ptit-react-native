import axios from "./axios";
import { ToastContainer, toast } from 'react-toastify';
import DataStorage from "../common/utility/DataStorage";
import { useState } from "react";
import { Alert } from "react-native";
//import 'react-toastify/dist/ReactToastify.css';
import { navigate, navigationRef } from "../navigations/RootNavigation";

const axiosApiInstance = axios.create({});
axiosApiInstance.interceptors.request.use(async (config) => {

  const token = await DataStorage.GetDataStorage(['@accessToken']);
  config.headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  return config;
});


axiosApiInstance.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response.status === 401) {
    const [refreshToken]= await DataStorage.GetDataStorage(['@refreshToken']);
      if (refreshToken) {
        let apiResponse = await axios.get(
          axios.defaults.baseURL + `/api/auth/user/refresh/${refreshToken}`
        );
        if (apiResponse.data.data.status && apiResponse) {
           DataStorage.SetDataStorage([{ key: '@accessToken', value: apiResponse.data.data.accessToken },
           { key: '@refreshToken', value: apiResponse.data.data.refreshToken },
           { key: '@userInfo', value: apiResponse.data.data.userInfo }])
          error.config.headers = {
            'Authorization': `Bearer ${apiResponse.data.data.accessToken}`
          }
          if(error.config.method ==='get')
             return axiosApiInstance.get(error.config.url)
          else(error.config.method ==='post')
             return  axiosApiInstance.post(error.config.url,error.config.data)
        }
        else {
          await DataStorage.RemoveDataStorage(['@accessToken', '@refreshToken', '@userInfo']);
          Alert.alert('Thông báo', 'vui long dang nhap ')
          navigate('ProfileNavigation')
        }
      } else {
        Alert.alert('Thông báo', 'vui long dang nhap ')
        navigate('ProfileNavigation')
      }
    } else {
      return Promise.reject(error);
    }
  }
);



export default axiosApiInstance;