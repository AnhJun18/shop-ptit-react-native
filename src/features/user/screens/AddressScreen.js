import React, { useState } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import Background from "../../../common/components/Background";
import MainHeader from "../../../common/components/MainHeader";
import style from "../styles/styleAddress";


function AddressScreen(props) {
    const navigation = props.navigation;
    const [province,setProvince] =useState('')
    return (
        <View>
            <MainHeader title={"Thêm địa chỉ mới"}></MainHeader>
            <View style={style.container}>
                <Background></Background>
                <View style={{ justifyContent: 'space-evenly', alignItems: 'center', height: '70%' }}>
                    <TextInput style={style.input} placeholder="Họ và tên"></TextInput>
                    <TextInput style={style.input} placeholder="Điện thoại"></TextInput>
                    <TextInput style={style.input} placeholder="Tỉnh thành"></TextInput>
                    <TextInput style={style.input} placeholder="Quận huyện"></TextInput>
                    <TextInput style={style.input} placeholder="Phường xã"></TextInput>
                    <TextInput style={style.input} placeholder="Địa chỉ"></TextInput>
                    <TouchableOpacity style={style.buttonAdd}><Text
                        style={{ color: 'black', fontWeight: '600', fontSize: 16, color: '#676161' }}
                    >Thêm mới</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default AddressScreen;