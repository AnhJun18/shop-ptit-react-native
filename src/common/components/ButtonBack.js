import React from "react";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";

import { navigate } from "../../navigations/RootNavigation";
// Tới màn hình được chỉ định qua prop screen hoặc trở về màn hình trước nếu screen null
function ButtonBack(props) {
    const navigation = props.navigation;
    const screen = props.screen || null;
    return (
        <View style={{flex:2,maxWidth:30}}>
            <TouchableOpacity onPress={() => {
              screen? navigation.navigate(screen) : navigate('HomeNavigation')
            }}><Ionicons name={'arrow-back'} size={30} />
            </TouchableOpacity>
        </View>
    )
}
export default ButtonBack