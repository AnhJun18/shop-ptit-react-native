import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RadioGroup } from "react-native-radio-buttons-group";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
function OrderHistoryScreen(props) {
    const radioNavBar = [
        {
            id: '1',
            label:'Chờ xác nhận',
            value:'Chờ xác nhận',
            selected:true
        },
        { 
            id: '2',
            label:'Chờ xác nhận',
            value:'Chờ xác nhận'
        }
    ]

    return (
        <View style={styles.container}>
            

        </View>
    )
}

export default OrderHistoryScreen;