import { useFocusEffect } from "@react-navigation/core";
import React, { useContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import { color } from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";
import DataStorage from "../../common/utility/DataStorage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AuthContext from "../../context/AuthProvider";
import axios from "../../context/axios";
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
        <View>
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
                                : <Icon name={'user-circle'} size={90} style={{ color: "#fff", marginLeft: 20 }}></Icon>}
                            {
                                logged ?
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={style.txtname}>{user?.userInfo?.firstName + " " + user?.userInfo?.lastName}</Text>
                                        <Text style={{fontSize:16,fontStyle:"italic"}}>@{user?.userInfo?.account.username}</Text>
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
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 18 }}>
                        <TouchableOpacity style={style.button} onPress={() => {
                            if (logged)
                                navigate("UserInfor", params = user)
                            else
                                navigate("LoginNavigation")

                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <FontAwesome
                                    style={{ padding: 3 }}
                                    name="user-o"
                                    color="#05375a"
                                    size={22}
                                    paddingHorizontal={1}
                                ></FontAwesome>
                                <Text style={style.txt}>Thông tin cá nhân</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button} onPress={() => { navigate("OrderHistory") }}>
                            <View style={{ flexDirection: 'row' }}>
                                <FontAwesome
                                    style={{ marginTop: 3 }}
                                    name="file-o"
                                    color="#05375a"
                                    size={22}
                                    paddingHorizontal={1}

                                ></FontAwesome>
                                <Text style={style.txt}>Đơn hàng</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button} >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ minWidth: 18 }}>
                                    <FontAwesome
                                        style={{ marginTop: 3 }}
                                        name="info"
                                        color="#05375a"
                                        size={22}
                                    />

                                </View>

                                <Text style={style.txt}>Trung tâm trợ giúp</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button} >
                            <View style={{ flexDirection: 'row' }}>
                                <FontAwesome
                                    style={{ marginTop: 3 }}
                                    name="tag"
                                    color="#05375a"
                                    size={22}
                                ></FontAwesome>
                                <Text style={style.txt}>Báo cáo</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button} onPress={async () => {
                            await logout().then(() => {
                                setLogged(false)
                            })
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <FontAwesome
                                    style={{ marginTop: 3 }}
                                    name="outdent"
                                    color="#05375a"
                                    size={20}
                                ></FontAwesome>
                                <Text style={style.txt}>Đăng xuất</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

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
        backgroundColor: '#0e8ba9'

    },
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 10,
        marginTop: 30,
        minHeight: 150,
    },
    container1: {
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        marginTop: 30,
        minHeight: 150,
    },
    button: {
        width: '100%',
        minHeight: 50,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    option: {
        flexDirection: 'row'
    },
    btn: {
        width: 90,
        backgroundColor: '#DCF5F9',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: 5,

    },
    textBtn: {
        color: '#736D6D',
        fontSize: 15
    },
    imgUser: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginLeft: 20
    },
    txtname: {
        fontSize: 22,
        fontWeight: 500,
        color: '#E3DEDE'
    },
    txt: {
        color: '#787171',
        fontSize: 18,
        marginLeft: 10,
    }
})
export default ProfileScreen