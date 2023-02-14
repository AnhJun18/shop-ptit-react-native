import React from "react";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
// Tới màn hình được chỉ định qua prop screen hoặc trở về màn hình trước nếu screen null
function ButtonBack(props) {
    const navigation = props.navigation;
    const screen = props.screen || null;
    return (
        <View>
            <TouchableOpacity onPress={() => {
              screen? navigation.navigate(screen) : navigation.goBack()
            }}><Ionicons name={'arrow-back'} size={30} />
            </TouchableOpacity>
        </View>
    )
}
export default ButtonBack