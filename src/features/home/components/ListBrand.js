import React from "react";
import { Image, View, Text } from "react-native";
const img1 = require('../../../assets/images/brand_01.png');

function ListBrand() {
    return (
        <View style={{ flexDirection: 'row', justifyContent:'space-between', alignItems: 'center',paddingHorizontal:10}}>
            <Image
                style={{ width: 80, height: 50 }}
                source={img1}
            ></Image>
            <Image
                style={{ width: 80, height: 50 }}
                source={require('../../../assets/images/brand_02.png')}
            ></Image>
            <Image
                style={{ width: 80, height: 50 }}
                source={require('../../../assets/images/brand_03.png')}
            ></Image>
            <Image
                style={{ width: 80, height: 50 }}
                source={require('../../../assets/images/brand_04.png')}
            ></Image>
        </View>
    )
}
export default ListBrand;