import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Background from "../../common/components/Background";
import MainHeader from "../../common/components/MainHeader";
import axiosApiInstance from "../../context/interceptor";
import { navigate } from "../../navigations/RootNavigation";
function ProfileScreen(props) {

    const [user,setUser]= useState([])
    getProfile =async()=>{
        const result = await axiosApiInstance.get("/api/user/profile");
        setUser(result.data)
    } 
    
    useEffect(()=>{
            getProfile();
    },[])

    return (
        <View style={{ height: '100%' }}>
            <Background></Background>
            <MainHeader title={"Quản lý tài khoản"} navigation={props.navigation}></MainHeader>
            <TouchableOpacity style={[style.container, {}]}>
                <Icon name={'user-circle-o'} size={60} style={{}}></Icon>
                <View style={{ marginLeft: 30 }}>
                    <Text>{user.userInfo?.firstName + " "  +user.userInfo?.lastName}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={style.button} onPress={()=>{
                navigate("UserInfor",params=user)
            }}>
                <View style={{ marginLeft: 30 }}>
                    <Text>Thông tin cá nhân</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={style.button}>
                <View style={{ marginLeft: 30 }}>
                    <Text>Quản lý đơn hàng</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={style.button}>
                <View style={{ marginLeft: 30 }}>
                    <Text>Đăng xuất</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        maxHeight: 200,
        width: '100%',
        shadowColor: "#333",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 7,
        marginBottom: 50,
    },
    button: {
        minHeight: 50,
        shadowColor: "#fff",
        shadowOffset: {
            width: 20,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 7,
        borderBottomWidth:1,
    }
})
export default ProfileScreen