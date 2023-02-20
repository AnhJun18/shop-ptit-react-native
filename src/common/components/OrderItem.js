import React from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
function ProductItem(props) {
    const name = props.name;
    const linkImg = props.linkImg;
    const id = props.id;
    const price = props.price;
    const navigation = props.navigation;
    return (
        <TouchableOpacity
            style={{
                backgroundColor: 'rgba(237, 237, 237, 1)', margin: 5, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 9,
                },
                shadowOpacity: 0.50,
                shadowRadius: 12.35,
                elevation: 7,
                borderBottomWidth: 0.5
            }}
        >
            <View style={{ flexDirection: 'row', maxHeight: 150, padding: 10 }}>
                <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-myshop-lpa.appspot.com/o/2586ad74-8dcd-4c62-902d-4458eb876464jpg?alt=media' }}
                    style={{
                        width: 114,
                        height: '100%',
                        marginRight: 10
                    }}
                ></Image>
                <View style={{ minHeight: 160 }}>
                    <View style={{ marginRight: 20 }}>
                        <Text style={{ maxWidth: 150, marginBottom: 20, fontSize: 17, fontWeight: '600', color: 'black' }} numberOfLines={1}>Áo sơ mi cổ tròn</Text>
                    </View>
                    <View style={{ marginRight: 20, flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                        <View>
                            <Text style={style.textItem} numberOfLines={1}>Size: M</Text>
                            <Text style={style.textItem} numberOfLines={1}>Màu: Trắng</Text>
                        </View>
                        <View style={{ right: -50 }}>
                            <Text style={style.textItem} numberOfLines={1}>1 x 99.000đ</Text>
                        </View>
                    </View>
                </View>
            </View>

        </TouchableOpacity>
    )
}
const style = StyleSheet.create({
    textItem: { 
        maxWidth: 114,
        fontSize: 15 ,
        color:'black'
    }
})
export default ProductItem;