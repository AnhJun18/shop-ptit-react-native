import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { color } from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";
import Background from "../../common/components/Background";
import MainHeader from "../../common/components/MainHeader";
import DataStorage from "../../common/utility/DataStorage";
import AuthContext from "../../context/AuthProvider";
import axios from "../../context/axios";
import axiosApiInstance from "../../context/interceptor";
import { navigate } from "../../navigations/RootNavigation";
function ProfileScreen(props) {
    const { logout } = useContext(AuthContext)
    const [user, setUser] = useState({})
    const [loaded, setLoad] = useState(false)
    const [accessToken, setAccessToken] = useState(null)
    getProfile = async () => {
        setLoad(false)
       await axios({
            method: 'get',
            url: axios.defaults.baseURL + `/api/user/profile`,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
        }).then((i)=>{
            setUser(i.data)
            setLoad(true)
        }
        ).catch(
            setLoad(true)
        )
        
    }
    getAccessToken = async () => {
        const [result] = await DataStorage.GetDataStorage(['@accessToken']);
        setAccessToken(result)
    }

    useEffect(async() => {
       await getAccessToken();
        getProfile();
    }, [loaded])

    return (
        <View style={{ height: '100%' }}>
            <Background></Background>
            {loaded ?
                <View>
                    <View style={style.main} >
                    <View style={[Object.keys(user).length?style.container1:style.container, {}]}>
                        <Icon name={'user-circle-o'} size={60} style={{}}></Icon>
                        {
                        Object.keys(user).length?
                            <View style={{ marginLeft: 30 }}>
                            <Text>{user?.userInfo?.firstName + " " + user?.userInfo?.lastName}</Text>
                            </View>:
                        <View style={style.option}>
                            <TouchableOpacity style={style.btn} onPress={() => {navigate("LoginNavigation")}}>
                                <Text style={style.textBtn}>Đăng nhập</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.btn} onPress={() => {navigate("Register")}}>
                                <Text style={style.textBtn}>Đăng ký</Text>
                            </TouchableOpacity>
                        </View>
                        }
                      </View>   
                    </View>
                    <TouchableOpacity style={style.button} onPress={() => {
                        navigate("UserInfor", params = user)
                    }}>
                        <View style={{ marginLeft: 30 }}>
                            <Text>Thông tin cá nhân</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={() => { navigate("OrderHistory") }}>
                        <View style={{ marginLeft: 30 }}>
                            <Text>Quản lý đơn hàng</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} >
                        <View style={{ marginLeft: 30 }}>
                            <Text>Trung tâm trợ giúp</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} >
                        <View style={{ marginLeft: 30 }}>
                            <Text>Báo cáo</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={logout}>
                        <View style={{ marginLeft: 30 }}>
                            <Text>Đăng xuất</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                : <ActivityIndicator
                    color="#DE0F3F"
                    size="large"
                    style={{ alignSelf: "center" }} />}
        </View>
    )
}
const style = StyleSheet.create({
    main:{
        backgroundColor:'#88DDE2'

    },
    container: {
        alignItems: 'center',
        justifyContent:'space-between',
        flexDirection: 'row',
        margin: 10,
        marginTop:30,
        minHeight: 100,
    },
    container1: {
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        marginTop:30,
        minHeight: 100,
    },
    button: {
        minHeight: 50,
        justifyContent:'center',
        borderBottomWidth: 1,
        borderStyle:'solid',
    },
    option:{
        flexDirection:'row'
    },
    btn: {
        width:100,
        backgroundColor: '#157099',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        marginLeft:10,
        
    },
    textBtn:{
    }
})
export default ProfileScreen