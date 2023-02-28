import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Background from "../../common/components/Background";
import MainHeader from '../../common/components/MainHeader';
import style from "../login/Styles";
function UserInforScreen(props) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            
        }, 
        mainLayout: {
            alignItems: 'center',    
        },
        input: {
            width: 300,
            color: '#5A5252',
            borderBottomWidth: 0.7,
            fontSize: 19,
            paddingBottom: 2 ,
            marginBottom: 15,
        },
        text: {
            fontSize: 20,
            color: '#5A5252',
            fontWeight: 450,
        },
        txtBtn: {
            fontSize: 25,
            fontWeight: 600,
            color: '#676161',
            marginRight: 45,
            marginLeft: 45,
        },
        textBlue:{
            color:'#3050FB',
            textDecorationLine: 'underline',
          },
        btn: {
            height: 50,
            backgroundColor: '#4ACBD3',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            marginTop: 20,
        },
    });
    return (
        <View style={styles.container}>
            <Background></Background>
            <View style={styles.mainLayout}>
                <KeyboardAvoidingView behavior="">
                    <Text style={styles.text}>Họ và Tên</Text>
                    <TextInput style={styles.input}
                        placeholder="Lê Phương Anh "
                        placeholderTextColor="#877C7C"
                    ></TextInput>
                    <Text style={styles.text}>SDT</Text>
                    <TextInput style={styles.input}
                        placeholder="0677482947"
                        placeholderTextColor="#877C7C"
                    ></TextInput>
                    <Text style={styles.text}>Email</Text>
                    <TextInput style={styles.input}
                        placeholder="123@gmail.com"
                        placeholderTextColor="#877C7C"
                    ></TextInput>
                    <Text style={styles.text}>Địa chỉ</Text>
                    <TextInput style={styles.input}
                        placeholder="Địa chỉ"
                        placeholderTextColor="#877C7C"
                    ></TextInput>
                </KeyboardAvoidingView>
                <TouchableOpacity style={styles.btn} >
                    <Text style={styles.txtBtn}>Cập nhật thông tin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 20, alignItems:'center' }}>
                    <Text style={styles.textBlue}>Đổi mật khẩu</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default UserInforScreen;