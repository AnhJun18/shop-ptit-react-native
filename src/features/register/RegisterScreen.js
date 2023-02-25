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
import RadioButton from "rn-radio-button";

function RegisterScreen(props) {
    const { register } = useContext(AuthContext)
    const dispath = useDispatch()
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');

 
    function pressCircle(i) {
        setGender(i);
    }

    const listData = [
        { label: "Nam", value:'Nam' },
        { label: "Nữ", value: 'Nữ' },
      ];

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
                                onChangeText={text => { setFirstName(text) }}
                            ></TextInput>
                        </View>
                        <View style={style.inputWrap}>
                            <TextInput style={style.inputName}
                                placeholder="Tên: "
                                onChangeText={text => { setLastName(text) }}
                            ></TextInput>
                        </View>
                    </View>

                    <View style={style.row}>
                        <View style={style.inputWrap}>
                            <Text>Giới tính:</Text>
                        </View>
                        <View style={style.inputWrap}>
                            <RadioButton
                                style={{flex:1,flexDirection: 'row'}}
                                outerWidth={15}
                                innerWidth={10}
                                borderWidth={1}
                                wrapperStyle={{ padding: 3 }}
                                data={listData}
                                color={"steelblue"}
                                onPress={pressCircle}
                                />
                        </View>
                        
                    </View>
                    
                    <TextInput style={style.input}
                        placeholder="Tên đăng nhập: "
                        onChangeText={text => { setUserName(text) }}
                    ></TextInput>
                    <TextInput style={style.input}
                        placeholder="SĐT: "
                        keyboardType="numeric"
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
                    onPress={Register}
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
    async function Register() {
        const apiResponse = await register({firstName: firstName, lastName: lastName, username: userName, gender: gender, email: email,phone: phone, password: pass, roleName: 'ROLE_USER' })
        if (apiResponse.data.data.status === false) {
            apiResponse.data.data.message.startsWith("Invalid") ?
                ToastAndroid.show('Tài khoản đã tồn tại', ToastAndroid.SHORT) :
                ToastAndroid.show(apiResponse.data.data.message, ToastAndroid.SHORT)
        }
    }
    
}

export default RegisterScreen