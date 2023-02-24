import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Text } from "react-native-elements";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
}) 
function NarBar(props){
    const nav = (props.data)
    console.log(nav)

    return (
        <View style={styles.container}>
            {nav.map(()=>{
                return (
                    <Text>nav.lable</Text>
                )
            })}
        </View>
        
    )
}
export default NarBar;