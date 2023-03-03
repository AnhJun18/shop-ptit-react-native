import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../style/Styles";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DataStorage from "../../../common/utility/DataStorage";
import AuthContext from "../../../context/AuthProvider";
import { navigate } from "../../../navigations/RootNavigation";
import { StatusBar } from "react-native";
function RegisterScreen(props) {
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
        <ScrollView style={[styles.container]}>
             <StatusBar backgroundColor="#0e8ba9" barStyle="light-content"></StatusBar>
            <View style={styles.header}>
                <Text style={styles.txt_header}>Đăng ký</Text>
                <Animatable.Image
                    animation="bounceIn"
                    source={require('../../../assets/images/logo.png')}
                    resizeMode="stretch"
                    style={[styles.logo, {marginTop: 50}]}
                ></Animatable.Image>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.main}>
            <Text style={styles.txt_main}>Họ tên</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user"
                        color="#05375a"
                        size={20}
                    ></FontAwesome>
                    <TextInput style={[styles.txt_input, { height: 40}]}
                        placeholderTextColor="#ccc"
                        placeholder="Nhập họ tên"
                        autoCapitalize="words"
                        onChangeText={(value) => setFirstName(value)}

                    />

                </View>
                <Text style={styles.txt_main}>Tên đăng nhập</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                    ></FontAwesome>
                    <TextInput style={[styles.txt_input, { height: 40}]}
                        placeholderTextColor="#ccc"
                        placeholder="Nhập tên đăng nhập"
                        autoCapitalize="none"
                        onChangeText={(value) => setUserName(value)}

                    />

                </View>
                <Text style={styles.txt_main}>SĐT</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="phone"
                        color="#05375a"
                        size={20}
                    ></FontAwesome>
                    <TextInput style={[styles.txt_input, { height: 40}]}
                        placeholderTextColor="#ccc"
                        placeholder="Nhập số điện thoại"
                        keyboardType="numeric"
                        autoCapitalize="none"
                        onChangeText={(value) => setPhone(value)}

                    />

                </View>
                <Text style={styles.txt_main}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="envelope-o"
                        color="#05375a"
                        size={20}
                    ></FontAwesome>
                    <TextInput style={[styles.txt_input, { height: 40}]}
                        placeholderTextColor="#ccc"
                        placeholder="Nhập Email"
                        autoCapitalize="none"
                        autoComplete="email"
                        keyboardType="email-address"
                        onChangeText={(value) => setEmail(value)}

                    />

                </View>
                <Text style={styles.txt_main}>Mật khẩu</Text>

                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={20}
                    ></FontAwesome>
                    <TextInput style={[styles.txt_input, { height: 40}]}
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
                <TouchableOpacity style={styles.button} onPress={Register}>
                    <Text style={styles.txt_btn}>Đăng ký</Text>
                </TouchableOpacity>
                <View style={styles.bottom}>
                    <TouchableOpacity onPress={() => navigate("LoginNavigation")}>
                        <Text>
                            <Text style={styles.text}>Bạn đã có tài khoản?</Text>
                            <Text style={styles.textBlue}>Đăng nhập</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </ScrollView>

    )
    async function Register() {
        console.log(firstName+" "+ userName+" "+phone+ " "+email + " " + pass)

    }
    
}

export default RegisterScreen