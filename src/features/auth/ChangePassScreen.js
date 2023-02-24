import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Background from "../../common/components/Background";
function ChangePassScreen(props) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            
        },
        input: {
            width: 300,
            color: '#5A5252',
            borderBottomWidth: 0.7,
            fontSize: 19,
            paddingBottom: 2 ,
            marginBottom: 20,
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
    });
    return (
        <View style={styles.container}>
            <Background></Background>
            <View>
                <KeyboardAvoidingView behavior="" style={{marginBottom:30}}>
                    <TextInput  style={styles.input}
                        placeholder="Nhập mật khẩu mới "
                        placeholderTextColor="#877C7C"
                    ></TextInput>
                    <TextInput  style={styles.input}
                        placeholder="Xác nhận mật khẩu mới "
                        placeholderTextColor="#877C7C"
                    ></TextInput>
                </KeyboardAvoidingView>
                <TouchableOpacity style={styles.btn} >
                    <Text style={styles.txtBtn}>Đổi mật khẩu</Text>
                </TouchableOpacity>
             {/*  
                
                
                <TouchableOpacity style={{ marginTop: 20, alignItems:'center' }}>
                    <Text style={styles.textBlue}>Đăng nhập</Text>
                </TouchableOpacity>*/}
            </View> 
        </View>
    )
}
export default ChangePassScreen;