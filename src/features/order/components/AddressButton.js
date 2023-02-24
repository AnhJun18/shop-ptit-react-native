import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import  Icon  from "react-native-vector-icons/FontAwesome";
import style from "../style/address";
import { useEffect,useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";
function AddressButton() {
    const [userInfo,setUserInfo] = useState({});
    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        (async ()=>{
         setUserInfo(JSON.parse(await AsyncStorage.getItem('@userInfo')));
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    })().catch(err=>console.log(err))
    }, [])
    return <TouchableOpacity style={style.container}>
        <Text style={style.title}>
            Địa chỉ nhận hàng
        </Text>
        <Text>
        {`${userInfo.firstName} ${userInfo.lastName}`} 
        </Text>
        <Text>
         {userInfo.phone}
        </Text>
        <Text>
            {userInfo.address}
        </Text>
       <Icon name={'angle-right'} size={30} style={{right:-350,top:-60}}></Icon>
    </TouchableOpacity>
}
export default AddressButton;