import React, { useContext, useState } from "react";
import { StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { navigate } from "../../../navigations/RootNavigation";
import styles from "../style/Styles";

function ForgotPass(props) {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#0e8ba9" barStyle="light-content"></StatusBar>
            <View style={styles.header}>
                <Text style={styles.txt_header}>Đặt lại mật khẩu</Text>
            </View>

            <Animatable.View
                animation="fadeInUpBig"
                style={styles.main}>
                <Text style={styles.txt_main}>Email tài khoản</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="envelope"
                        color="#05375a"
                        size={20}
                    ></FontAwesome>
                    <TextInput style={styles.txt_input}
                        placeholderTextColor="#ccc"
                        placeholder="Nhập email"
                        autoCapitalize="none"

                    />

                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.txt_btn}>Gửi Mã</Text>
                </TouchableOpacity>
                <View style={styles.bottom}>
                    <TouchableOpacity onPress={() => navigate("Login")}>
                        <Text style={styles.textBlue}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>

        </View>

    )
   
}

export default ForgotPass