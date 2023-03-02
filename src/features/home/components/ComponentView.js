import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import ListAllProduct from "./ListAllProduct";
function ComponentsView(props) {
    const title = props.title;
    const child= props.child;
    return (
        <View style={[{color:'black',minHeight:100,backgroundColor:'white',marginBottom:20,paddingLeft:5, paddingBottom:5, paddingTop:3}]}>
            <Text>{title?title:''}</Text>
            <SafeAreaView>{child? child(props.navigation):null}</SafeAreaView>
        </View>
    )
}
export default ComponentsView