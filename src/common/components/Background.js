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
                colors={['rgba(244, 143, 161, 0.5)', 'rgba(159, 183, 206, 0.737)', 'rgba(137, 177, 255, 1)']}
            >
            </LinearGradient>
        
    )
}
export default Background