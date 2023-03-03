import React, { useContext, useState } from "react";
import { Dimensions, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DataStorage from "../../../common/utility/DataStorage";
import AuthContext from "../../../context/AuthProvider";
import { navigate } from "../../../navigations/RootNavigation";
import styles from "../style/Styles";

function LoginScreen(props) {
    const { login } = useContext(AuthContext)
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [hidePass, setHidePass] = useState(true)
    const navigation = props.navigation
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#0e8ba9" barStyle="light-content"></StatusBar>
            <View style={styles.header}>


                <Text style={styles.txt_header}>Xin chào,</Text>
                <Animatable.Image
                    animation="bounceIn"
                    source={require('../../../assets/images/logo.png')}
                    resizeMode="stretch"
                    style={styles.logo}
                ></Animatable.Image>
            </View>

            <Animatable.View
                animation="fadeInUpBig"
                style={styles.main}>
                <Text style={styles.txt_main}>Tên đăng nhập</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                    ></FontAwesome>
                    <TextInput style={styles.txt_input}
                        placeholderTextColor="#ccc"
                        placeholder="Nhập tên đăng nhập"
                        autoCapitalize="none"
                        onChangeText={(value) => setUserName(value)}

                    />

                </View>
                <Text style={styles.txt_main}>Mật khẩu</Text>

                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={20}
                    ></FontAwesome>
                    <TextInput style={styles.txt_input}
                        placeholder="Nhập mật khẩu"
                        placeholderTextColor="#ccc"
                        autoCapitalize="none"
                        secureTextEntry={hidePass ? true : false}
                        onChangeText={(value) => setPass(value)}
                    />
                    {hidePass ?
                        <FontAwesome
                            name="eye-slash"
                            color="#05375a"
                            size={20}
                            onPress={() => setHidePass(!hidePass)}
                        /> :
                        <FontAwesome
                            name="eye"
                            color="#05375a"
                            size={20}
                            onPress={() => setHidePass(!hidePass)}
                        />}

                </View>
                <TouchableOpacity style={styles.button} onPress={Login}>
                    <Text style={styles.txt_btn}>Đăng nhập</Text>
                </TouchableOpacity>
                <View style={styles.bottom}>
                    <TouchableOpacity onPress={() => navigate("ForgotPass")}>
                        <Text style={styles.textBlue}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 15 }} onPress={() => navigate("Register")}>
                        <Text>
                            <Text style={styles.text}>Chưa có tài khoản?</Text>
                            <Text style={styles.textBlue}>Đăng ký</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>

        </View>

    )
    async function Login() {
        const apiResponse = await login({ username: userName, password: pass })
        if (apiResponse.data.data.status === true) {
            DataStorage.SetDataStorage([{ key: '@accessToken', value: apiResponse.data.data.accessToken },
            { key: '@refreshToken', value: apiResponse.data.data.refreshToken },
            { key: '@userInfo', value: apiResponse.data.data.userInfo }])
            navigate("HomeNavigation");
        }
        else
            apiResponse.data.data.message.startsWith("Invalid") ?
                ToastAndroid.show('Thông tin đăng nhập không chính xác!', ToastAndroid.SHORT) :
                ToastAndroid.show(apiResponse.data.data.message, ToastAndroid.SHORT)
    }
}

export default LoginScreen