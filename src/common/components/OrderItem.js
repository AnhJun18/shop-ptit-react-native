import React, { useEffect } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
function ProductItem({item}) {
    //console.log(item)
    const info= item.product.infoProduct
    const name = info.name;
    const linkImg = info.linkImg;
    const amout =item.amount;
    const id = item.product.id;
    const price = info.price;
    // const navigation = props.navigation;
    const size= item.product.size;
    const color= item.product.color;
    const [itemState,setItemState]= useEffect({});
    useEffect(()=>setItemState(item),[])
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
                <Image source={{ uri: linkImg }}
                    style={{
                        width: 114,
                        height: '100%',
                        marginRight: 10
                    }}
                ></Image>
                <View style={{ minHeight: 160 }}>
                    <View style={{ marginRight: 20 }}>
                        <Text style={{ maxWidth: 150, marginBottom: 20, fontSize: 17, fontWeight: '600', color: 'black' }} numberOfLines={1}>{name}</Text>
                    </View>
                    <View style={{ marginRight: 20, flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                        <View>
                            <Text style={style.textItem} numberOfLines={1}>Size: {size}</Text>
                            <Text style={style.textItem} numberOfLines={1}>Màu: {color}</Text>
                        </View>
                        <View style={{ right: -50 }}>
                            <Text style={style.textItem} numberOfLines={1}>{amout} x {price}</Text>
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