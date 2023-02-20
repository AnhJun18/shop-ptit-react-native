import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import  Icon  from "react-native-vector-icons/FontAwesome";
import style from "../style/address";
function AddressButton() {
    return <TouchableOpacity style={style.container}>
        <Text style={style.title}>
            Địa chỉ nhận hàng
        </Text>
        <Text>
            Lê Phương Anh
        </Text>
        <Text>
            0123456789
        </Text>
        <Text>
            97 Man Thiện, Tăng Nhơn Phú B, Thủ Đức, Sài Gòn
        </Text>
       <Icon name={'angle-right'} size={30} style={{right:-350,top:-60}}></Icon>
    </TouchableOpacity>
}
export default AddressButton;