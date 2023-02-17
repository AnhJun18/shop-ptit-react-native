import React, { useContext, useEffect } from "react";
import { Text, TouchableOpacity, View, Button } from 'react-native';
import axios from "../../../context/axios";
import axiosApiInstance from "../../../context/interceptor";
import DataStorage from "../../../common/utility/DataStorage";
import AuthContext, { AuthContextProvider } from "../../../context/AuthProvider";

function HomeScreen(props) {
    const { logout, login } = useContext(AuthContext)
    onPressLearnMore = async () => {
        console.log(await DataStorage.GetDataStorage(['@accessToken']))
        console.log(await DataStorage.GetDataStorage(['@refreshToken']))
    }
    onPress = async () => {

        await DataStorage.RemoveDataStorage(['@accessToken','@refreshToken'])
    }
    onPressLearn = async () => {
        const result = await axiosApiInstance.get(axios.defaults.baseURL + `/api/user/profile`)
        console.log('result', result)
    }
    return (
        <View>
            <Button title="Home" onPress={onPressLearnMore}></Button>
            <Button title="Logout" onPress={onPress}></Button>
            <Button title="Call Api" onPress={onPressLearn}></Button>
        </View>

    )
}
export default HomeScreen;