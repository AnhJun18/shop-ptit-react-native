import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Background from "../../common/components/Background";
import { navigate } from "../../navigations/RootNavigation";
function ForgotPassScreen(props) {
    const [yourEmail,setYourEmail]= useState()
    handleSubmit =()=>{
        console.log(yourEmail)
    }
    return (
        <View style={styles.container}>
            <Background></Background>
            <View>
                <Text style={styles.text}>Email đăng ký</Text>
                <KeyboardAvoidingView behavior="" >
                    <TextInput  style={styles.input} onChangeText={(v)=> setYourEmail(v)}
                        placeholder="Nhập email của bạn"
                    ></TextInput>
                </KeyboardAvoidingView>
                <TouchableOpacity style={styles.btn} >
                    <Text style={styles.txtBtn} onPress={handleSubmit}>Gửi Mã</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 20, alignItems:'center' }} onPress={()=>navigate("LoginNavigation")}>
                    <Text style={styles.textBlue}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ForgotPassScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    text: {
        fontSize: 24,
        color: '#5A5252',
        fontWeight: 400,
    },
    input: {
        width: 300,
        color: '#5A5252',
        borderBottomWidth: 0.7,
        fontSize: 19,
        paddingBottom: 1,
        marginBottom: 35
    },
    btn: {
        height: 50,
        backgroundColor: '#4ACBD3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    txtBtn: {
        fontSize: 25,
        fontWeight: 600,
        color: '#676161'
    },
    textBlue:{
        color:'#3050FB',
        textDecorationLine: 'underline',
      },
 });