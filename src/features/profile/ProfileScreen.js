import { useFocusEffect } from "@react-navigation/core";
import React, { useContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
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
    const [logged, setLogged] = useState(false)
    const [accessToken, setAccessToken] = useState(null)
    getProfile = async () => {
        setLoad(false)
        console.log(accessToken)
        await axios({
            method: 'get',
            url: axios.defaults.baseURL + `/api/user/profile`,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
        }).then((i) => {
            setUser(i.data)
            setLogged(true)
            setLoad(true)
        }
        ).catch(() => {
            setUser({})
            setLoad(true)
        }
        )

    }
    getAccessToken = async () => {
        const [result] = await DataStorage.GetDataStorage(['@accessToken']);
        setAccessToken(result)
    }

    useFocusEffect(React.useCallback(async () => {
        await getAccessToken();
        getProfile();
    }, []))

    return (
        <View style={{ height: '100%' }}>
            <Background></Background>
            {loaded ?
                <View>
                    <View style={style.main} >
                        <View style={[logged ? style.container1 : style.container, {}]}>
                            {logged ?
                                <Image
                                    style={style.imgUser}
                                    source={{
                                        uri: `https://scontent.fsgn8-4.fna.fbcdn.net/v/t1.6435-9/94490914_251126279594068_206153920492339200_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=4LiMGrst1JIAX9yARQL&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfDISEZ5Q3ccLF5lOSVikPVMIaTNbVBxdMSmG_be0vNHcQ&oe=6427C1F8`,
                                    }}
                                />
                                : <Icon name={'user-circle-o'} size={60} style={{color:"#fff"}}></Icon>}
                            {
                                logged ?
                                    <View style={{ marginLeft: 30 }}>
                                        <Text>{user?.userInfo?.firstName + " " + user?.userInfo?.lastName}</Text>
                                    </View> :
                                    <View style={style.option}>
                                        <TouchableOpacity style={style.btn} onPress={() => { navigate("LoginNavigation") }}>
                                            <Text style={style.textBtn}>Đăng nhập</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.btn} onPress={() => { navigate("Register") }}>
                                            <Text style={style.textBtn}>Đăng ký</Text>
                                        </TouchableOpacity>
                                    </View>
                            }
                        </View>
                    </View>
                    <TouchableOpacity style={style.button} onPress={() => {
                        if(logged)
                             navigate("UserInfor", params = user)
                        else
                            navigate("LoginNavigation")

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
                    <TouchableOpacity style={style.button} onPress={async () => {
                        await logout().then(() => {
                            setLogged(false)
                        })
                    }}>
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
    main: {
        backgroundColor: '#1697A9'

    },
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 10,
        marginTop: 30,
        minHeight: 100,
    },
    container1: {
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        marginTop: 30,
        minHeight: 100,
    },
    button: {
        minHeight: 50,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    option: {
        flexDirection: 'row'
    },
    btn: {
        width: 100,
        backgroundColor: '#157099',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: 10,

    },
    textBtn: {
    },
    imgUser:{
        width:50,
        height:50,
        borderRadius:50
    }
})
export default ProfileScreen