import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Linking } from "react-native";
import { openInbox } from 'react-native-email-link';
import { StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "../../../context/axios";
import axiosApiInstance from "../../../context/interceptor";
import { navigate } from "../../../navigations/RootNavigation";
import styles from "../style/Styles";

function ForgotPass(props) {
    const [userEmail, setUserEmail] = useState(null)
    const [loading, setLoading] = useState(false)
    const [sended, setSended] = useState(false)
    const openGmail = () => {
        openInbox();
      }
    submitSendEmail = async () => {
        setLoading(true)
       const apiResponse = await axios.post('/api/auth/user/forgot-password', { email: userEmail })
        setSended(true)
        setLoading(false)
    }
    useEffect(()=>{setSended(false)},[])
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#0e8ba9" barStyle="light-content"></StatusBar>
            <View style={styles.header}>
                <Text style={styles.txt_header}>Đặt lại mật khẩu</Text>
            </View>
            {!sended ?
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
                            onChangeText={(v) => { setUserEmail(v) }}
                        />

                    </View>
                    <TouchableOpacity style={styles.button} disabled={loading ? true : false} onPress={submitSendEmail}>
                        {loading ?
                            <ActivityIndicator color='#fff' />
                            :
                            <Text style={styles.txt_btn}>Gửi Mã</Text>
                        }

                    </TouchableOpacity>
                    <View style={styles.bottom}>
                        <TouchableOpacity onPress={() => navigate("Login")}>
                            <Text style={styles.textBlue}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            :
                <Animatable.View
                    animation="jello"
                    style={[styles.main]}>
                    <Text style={styles.txt_main}>Chúng tôi đã gửi link xác nhận đến email của bạn. </Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigate("LoginNavigation")}>
                        <Text style={styles.txt_btn}>Đi đến đăng nhập</Text>
                    </TouchableOpacity>
                    <View style={styles.bottom}>
                        <TouchableOpacity onPress={openGmail}>
                            <Text style={styles.textBlue}>Đi đến gmail</Text>
                        </TouchableOpacity>
                    </View>

                </Animatable.View>  
            }

        </View>

    )

}

export default ForgotPass