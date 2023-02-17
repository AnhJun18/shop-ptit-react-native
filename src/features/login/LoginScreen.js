import React, { useContext, useState } from "react";
import { TextInput } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";
import ButtonBack from "../../common/components/ButtonBack";
import DataStorage from "../../common/utility/DataStorage";
import style from "./Styles";
import { useDispatch } from "react-redux";
import Background from "../../common/components/Background";
import AuthContext from "../../context/AuthProvider";
import { navigate } from "../../navigations/RootNavigation";
import { ToastAndroid } from "react-native";
function LoginScreen(props) {
    const { login } = useContext(AuthContext)
    const dispath = useDispatch()
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [hidePass, setHidePass] = useState(true)
    const navigation = props.navigation
    return (

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Background></Background>
            <ButtonBack navigation={navigation} ></ButtonBack>
            <View style={style.mainLayout}>
                <Text style={style.text}>Login</Text>
                <KeyboardAvoidingView behavior="">
                    <TextInput style={style.input}
                        placeholder="Tên đăng nhập: "
                        onChangeText={text => { setUserName(text) }}
                    ></TextInput>
                    <TextInput style={style.input}
                        placeholder="Mật khẩu: "
                        secureTextEntry={hidePass}
                        onChangeText={text => { setPass(text) }}
                    ></TextInput>
                </KeyboardAvoidingView>
                <TouchableOpacity style={style.buttonLogin}
                    onPress={Login}
                >
                    <Text style={[style.text, { fontSize: 20 }]}>Đăng nhập</Text>
                </TouchableOpacity>
                <View style={style.bottom}>
                    <TouchableOpacity >
                        <Text style={style.textBlue}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 15 }}>
                        <Text>
                            <Text>Chưa có tài khoản?</Text>
                            <Text style={style.textBlue}>Đăng ký</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

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