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
function RegisterScreen(props) {
    const { register } = useContext(AuthContext)
    const dispath = useDispatch()
    const [userName, setUserName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [pass, setPass] = useState('');
    const [hidePass, setHidePass] = useState(true)
    const navigation = props.navigation
    return (

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Background></Background>
            <ButtonBack navigation={navigation} ></ButtonBack>
            <View style={style.mainLayout}>
                <Text style={style.text}>Register</Text>
                <KeyboardAvoidingView behavior="">
                    <View style={style.row}>
                        <View style={style.inputWrap}>
                            <TextInput style={style.inputName}
                                placeholder="Họ đệm: "
                                onChangeText={text => { setFamilyName(text) }}
                            ></TextInput>
                        </View>
                        <View style={style.inputWrap}>
                            <TextInput style={style.inputName}
                                placeholder="Tên: "
                                onChangeText={text => { setName(text) }}
                            ></TextInput>
                        </View>
                        
                    </View>
                    
                    <TextInput style={style.input}
                        placeholder="Tên đăng nhập: "
                        onChangeText={text => { setUserName(text) }}
                    ></TextInput>
                    <TextInput style={style.input}
                        placeholder="SĐT: "
                        onChangeText={text => { setPhone(text) }}
                    ></TextInput>
                    <TextInput style={style.input}
                        placeholder="Email: "
                        onChangeText={text => { setEmail(text) }}
                    ></TextInput>
                    <TextInput style={style.input}
                        placeholder="Mật khẩu: "
                        secureTextEntry={hidePass}
                        onChangeText={text => { setPass(text) }}
                    ></TextInput>
                </KeyboardAvoidingView>
                <TouchableOpacity style={style.buttonLogin}
                >
                    <Text style={[style.text, { fontSize: 20 }]}>Đăng ký</Text>
                </TouchableOpacity>
                <View style={style.bottom}>
                    <TouchableOpacity style={{ marginTop: 15 }}>
                        <Text>
                            <Text>Đã có tài khoản?</Text>
                            <Text style={style.textBlue}>Đăng nhập</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    )
    
}

export default RegisterScreen