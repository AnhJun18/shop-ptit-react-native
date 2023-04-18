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
    const [hidePassNew, setHidePassNew] = useState(true)
    const [hidePassConfirm, sethidePassConfirm] = useState(true)
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
            <Text style={styles.txt_main}>Mật khẩu hiện tại</Text>
            <View style={styles.action}>
                <FontAwesome
                    name="key"
                    color="#05375a"
                    size={20}
                ></FontAwesome>
                <TextInput style={styles.txt_input}
                    placeholder="Mật khẩu hiện tại "
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
                    secureTextEntry={hidePassNew ? true : false}
                />
                {hidePassNew ?
                    <FontAwesome
                        name="eye-slash"
                        color="#05375a"
                        size={20}
                        onPress={() => setHidePassNew(!hidePassNew)}
                    /> :
                    <FontAwesome
                        name="eye"
                        color="#05375a"
                        size={20}
                        onPress={() => setHidePassNew(!hidePassNew)}
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
                    secureTextEntry={hidePassConfirm ? true : false}
                />
                {hidePassConfirm ?
                    <FontAwesome
                        name="eye-slash"
                        color="#05375a"
                        size={20}
                        onPress={() => sethidePassConfirm(!hidePassConfirm)}
                    /> :
                    <FontAwesome
                        name="eye"
                        color="#05375a"
                        size={20}
                        onPress={() => sethidePassConfirm(!hidePassConfirm)}
                    />}

            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={{fontSize: 21, fontWeight: 400, color: '#000'}}>Đổi mật khẩu</Text>
             </TouchableOpacity>
            
        </Animatable.View>

    </View>
    )
}
export default ChangePassScreen;