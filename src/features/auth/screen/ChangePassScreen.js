import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, StatusBar } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "../style/Styles";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DataStorage from "../../../common/utility/DataStorage";
import AuthContext from "../../../context/AuthProvider";
import { navigate } from "../../../navigations/RootNavigation";
function ChangePassScreen(props) {
    const [hidePass, setHidePass] = useState(true)
    return (
        <View style={styles.container}>
        <StatusBar backgroundColor="#0e8ba9" barStyle="light-content"></StatusBar>
        <View style={styles.header}>
            <Text style={styles.txt_header}>Đặt lại mật khẩu</Text>
        </View>

        <Animatable.View
            animation="fadeInUpBig"
            style={styles.main}>
            <Text style={styles.txt_main}>Mật khẩu mới</Text>
            <View style={styles.action}>
                <FontAwesome
                    name="key"
                    color="#05375a"
                    size={20}
                ></FontAwesome>
                <TextInput style={styles.txt_input}
                    placeholder="Nhập mật khẩu mới"
                    placeholderTextColor="#ccc"
                    autoCapitalize="none"
                    secureTextEntry={hidePass ? true : false}
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
            <Text style={styles.txt_main}>Xác nhận mật khẩu mới</Text>
            <View style={styles.action}>
                <FontAwesome
                    name="key"
                    color="#05375a"
                    size={20}
                ></FontAwesome>
                <TextInput style={styles.txt_input}
                    placeholder="Xác nhận mật khẩu "
                    placeholderTextColor="#ccc"
                    autoCapitalize="none"
                    secureTextEntry={hidePass ? true : false}
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
            <TouchableOpacity style={styles.button} >
                <Text style={styles.txt_btn}>Đổi mật khẩu</Text>
            </TouchableOpacity>
            <View style={styles.bottom}>
                <TouchableOpacity onPress={() => navigate("LoginNavigation")}>
                    <Text style={styles.textBlue}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>

    </View>
    )
}
export default ChangePassScreen;