import React from "react";
import { TextInput } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";
import ButtonBack from "../../common/components/ButtonBack";
import style from "./Styles";
const IconUser = require('../../img/icon/user.png')
function LoginScreen(props) {
    const navigation = props.navigation
    return (
        <ScrollView>
            <ButtonBack navigation={navigation} ></ButtonBack>
            <View style={style.mainLayout}>
                <Image source={IconUser} style={style.imageUser}></Image>
                <Text style={style.text}>Login</Text>
                <KeyboardAvoidingView behavior="height">
                    <TextInput style={style.input} placeholder="Tên đăng nhập:" autoFocus={false}> </TextInput>
                    <TextInput style={style.input} placeholder="Mật khẩu: "></TextInput>
                </KeyboardAvoidingView>
                <TouchableOpacity style={style.buttonLogin}>
                    <Text style={[style.text, { fontSize: 20 }]}>Đăng nhập</Text>
                </TouchableOpacity>
                <View style={style.bottom}>
                    <TouchableOpacity >
                        <Text style={style.textBlue}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop:15}}>
                        <Text>
                            <Text>Chưa có tài khoản?</Text>
                            <Text style={style.textBlue}>Đăng ký</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
export default LoginScreen