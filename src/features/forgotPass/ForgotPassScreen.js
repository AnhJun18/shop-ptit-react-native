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
function ForgotPassScreen(props) {
    const { login } = useContext(AuthContext)
    const dispath = useDispatch()
    const [email, setEmail] = useState('');
    const [hidePass, setHidePass] = useState(true)
    const navigation = props.navigation
    return (

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Background></Background>
            <ButtonBack navigation={navigation} ></ButtonBack>
            <View style={style.mainLayout}>
                <KeyboardAvoidingView behavior="">
                <Image
                    style={style.imageUser}
                    source={require('./email.png')}
                />
                    <TextInput style={style.input}
                        placeholder="Email đăng ký:"
                        onChangeText={text => { setEmail(text) }}
                    ></TextInput>
                </KeyboardAvoidingView>
                <TouchableOpacity style={style.buttonLogin}
                >
                    <Text style={[style.text, { fontSize: 20 }]}>Gửi mã</Text>
                </TouchableOpacity>
                <View style={style.bottom}>
                    <TouchableOpacity style={{ marginTop: 15 }}>
                        <Text style={style.textBlue}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    )

}

export default ForgotPassScreen