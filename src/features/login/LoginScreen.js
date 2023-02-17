import React, { useState } from "react";
import { TextInput } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";
import ButtonBack from "../../common/components/ButtonBack";
import DataStorage from "../../common/utility/DataStorage";
import style from "./Styles";
import CreateRequest from "../../common/utility/CreateRequest";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import Background from "../../common/components/Background";
function LoginScreen(props) {
    const dispath = useDispatch()
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [hidePass, setHidePass] = useState(true)
    const navigation = props.navigation
    return (

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
    function Login() {
        CreateRequest('api/auth/user/login', 'POST', { username: userName, password: pass })
            .then(res => SaveToken(res.data))
            .catch(err => console.log(err))
    }
    async function SaveToken(data) {
        if (data.status) {
            let accessToken = data.accessToken;
            let refreshToken = data.refreshToken;
            console.log(accessToken)
            let user = data.userInfo;
            // Alert.alert('Thông báo','Đăng nhập thành công');
            dispath({type:'SET_INFO',data:{
                accessToken:accessToken,
                refreshToken:refreshToken,
              }})
            dispath({ type: 'login' })
            return DataStorage.SetDataStorage([{ key: '@accessToken', value: accessToken },
            { key: '@refreshToken', value: refreshToken },
            { key: '@userInfo', value: user }])
        }
        else {
            Alert.alert('Thông báo', 'Đăng nhập thất bại');
            return null;
        }
    }
}

export default LoginScreen