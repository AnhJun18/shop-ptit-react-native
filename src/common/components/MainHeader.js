import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import ButtonBack from "./ButtonBack";
function MainHeader(props) {
    const title = props.title;
    const navigation=props.navigation;
    return (
        <View style={style.container}>
            <ButtonBack></ButtonBack>
            <View style={{alignItems:'center',width:'80%'}}>
                <Text style={{fontSize:20,fontWeight:'600',color:'black'}}>
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
        backgroundColor:'#1697A9',
        alignItems:'center',

    }
})
export default MainHeader