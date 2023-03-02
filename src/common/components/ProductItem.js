
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
                backgroundColor: 'rgba(237, 237, 237, 1)', margin: 5, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
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
                <Text style={{ maxWidth: 114, marginBottom: 10 }} numberOfLines={1}>{name}</Text>
                <Text>{price.toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND'
                })} </Text>
            </View>
        </TouchableOpacity>
    )
}
export default ProductItem;