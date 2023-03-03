
import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { navigate, navigationRef } from "../../navigations/RootNavigation";
function ProductItem(props) {
    const name = props.name;
    const linkImg = props.linkImg;
    const id = props.id;
    const price = props.price;
    const navigation = props.navigation;
    return (
        <TouchableOpacity
            onPress={() => navigate('ProductDetail', { itemID: id })}
            style={{
                backgroundColor: 'rgba(237, 237, 237, 1)', margin: 5, shadowColor: "#ccc",
                shadowOffset: {
                    width: 10,
                    height: 9,
                },
                shadowOpacity: 0.50,
                shadowRadius: 12.35,
                elevation: 7,
            }}
        >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: linkImg }}
                    style={{
                        width: 114,
                        height: 120,

                    }}
                ></Image>
                <View style={{backgroundColor:'#ffffff',alignItems:'center',width:114,paddingVertical:6,paddingHorizontal:2}}>
                    <Text style={{ maxWidth: 114,color:'#756f6f' }} numberOfLines={1}>{name}</Text>
                    <Text style={{ color:'#e47864' }}>{price.toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND'
                    })} </Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}
export default ProductItem;