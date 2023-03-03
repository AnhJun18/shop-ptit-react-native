import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
function MainHeader(props) {
    const title = props.title;
    const navigation = props.navigation;
    const nameScreen= props.screen;
    return (
        <View style={style.container}>
            <View style={{ flex: 2, maxWidth: 30 }}>
                <TouchableOpacity onPress={() => { navigation.navigate(nameScreen?nameScreen:"Home")
                }}><Ionicons name={'arrow-back'} size={30} />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', width: '80%' }}>
                <Text style={{ fontSize: 20, fontWeight: '600', color: 'black' }}>
                    {title}
                </Text>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        height: 48,
        width: '100%',
        flexDirection: 'row',
        backgroundColor:'#0e8ba9',
        alignItems:'center',

    }
})
export default MainHeader