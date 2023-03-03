import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import ListAllProduct from "./ListAllProduct";
function ComponentsView(props) {
    const title = props.title;
    const child= props.child;
    return (
        <View style={[{color:'black',minHeight:100,backgroundColor:'#f5f5f5',padding:10,marginBottom:15}]}>
            <Text style={{color:'#212121',marginBottom:title?5:0,fontSize:16}}>{title?title:''}</Text>
            <SafeAreaView>{child? child(props.navigation):null}</SafeAreaView>
        </View>
    )
}
export default ComponentsView