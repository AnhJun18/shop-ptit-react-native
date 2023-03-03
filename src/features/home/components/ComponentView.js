import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import ListAllProduct from "./ListAllProduct";
import * as Animatable from "react-native-animatable";

function ComponentsView(props) {
    const title = props.title;
    const child= props.child;
    const refreshing= props.refreshing;
    return (
        <Animatable.View 
        animation="fadeInUpBig"
        style={[{color:'black',minHeight:100,backgroundColor:'#f5f5f5',padding:10,marginBottom:15}]}>
            <Text style={{color:'#212121',marginBottom:title?5:0,fontSize:16}}>{title?title:''}</Text>
            <SafeAreaView>{child? child({navigation:props.navigation,refreshing:refreshing}):null}</SafeAreaView>
        </Animatable.View>
    )
}
export default ComponentsView