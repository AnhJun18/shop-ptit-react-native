import axios from "./axios";
import { ToastContainer, toast } from 'react-toastify';
import DataStorage from "../common/utility/DataStorage";
import { useState } from "react";
import { Alert } from "react-native";
//import 'react-toastify/dist/ReactToastify.css';
import { navigate } from "../navigations/RootNavigation";

const axiosApiInstance = axios.create({});
axiosApiInstance.interceptors.request.use(async(config) => {
  
  const token= await DataStorage.GetDataStorage(['@accessToken']);
  console.log('tk',token)
  config.headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  return config;
});


axiosApiInstance.interceptors.response.use(
  response  => response,
  async (error) => {
    if (error.response.status === 401) {
      navigate('ProfileNavigation')
    } else {
      return Promise.reject(error);
    }
  }
);



export default axiosApiInstance;