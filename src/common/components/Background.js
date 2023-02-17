import React from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
function Background() {
    return (
     
            <LinearGradient
                style={
                    {
                        width: '100%', top: 0, left: 0, height:'100%',position:'absolute'
                    }
                }
                colors={['rgba(253, 248, 248, 1)', 'rgba(162, 229, 243, 1)']}
            >
            </LinearGradient>
        
    )
}
export default Background