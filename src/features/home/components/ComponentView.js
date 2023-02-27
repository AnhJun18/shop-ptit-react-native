import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import ListAllProduct from "./ListAllProduct";
function ComponentsView(props) {
    const title = props.title;
    const child= props.child;
    return (
        <View style={[{minHeight:100,backgroundColor:'white',marginBottom:20}]}>
            <Text>{title?title:''}</Text>
            <SafeAreaView>{child? child(props.navigation):null}</SafeAreaView>
        </View>
    )
}
export default ComponentsView