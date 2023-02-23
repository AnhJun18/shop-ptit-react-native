import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Button, Alert, ToastAndroid } from 'react-native';

import axiosApiInstance from "../../context/interceptor";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import axios from "../../context/axios";
import MainHeader from "../../common/components/MainHeader";

function ProductDetailScreen(props) {
    const styles = StyleSheet.create({
        container: {
            height: '100%',
            backgroundColor: '#CDF1F1'
        },
        tinyLogo: {
            width: '60%',
            height: 400,
        },
        logo: {
            width: 66,
            height: 58,
        },
        txtName: {
            color: '#000',
            fontSize: 26,
            fontWeight: 500
        },
        imgView: {
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
        },
        txtPrices: {
            fontSize: 30,
            fontWeight: 600
        },
        txtDetail: {
            fontSize: 22,
            fontWeight: 600
        },
        infoProduct: {
            paddingHorizontal: 40,
            paddingVertical: 20,
            borderBottomWidth: 1,
        },
        productDetail: {
            paddingHorizontal: 40,
            paddingVertical: 20,
        },
        menu: {
            flex: 1,
            flexDirection: "row",
            backgroundColor: '#a38',
            height: 100,
            width: '100%',
            position: 'absolute',
            justifyContent: 'space-evenly',
            bottom: 10,
        },
        btn: {
            width: '50%',
            backgroundColor: '#00CD66',
            borderColor: '#ccc',
            borderWidth: 2,
            borderStyle: 'solid',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',

        },
        txtBtn: {
            marginLeft: 10,
            fontSize: 25,
            fontWeight: 600,
        },
        txtHeader: {
            fontSize: 25,
            color: '#000',
            fontWeight: 600

        }
    });

    const [product, setProduct] = useState([]);
    const [value, setValue] = useState('first');

    getProduct = async () => {
        const apiResponse = await axiosApiInstance.get(axios.defaults.baseURL + '/api/product/detail/2');
        setProduct(apiResponse.data)
    }

    addToCart = () => {
        ToastAndroid.show("Vui long chọn thông tin sp", ToastAndroid.SHORT)
    }

    useEffect(() => {
        getProduct()
    }, [])


    return (
        <View style={styles.container}>
            <MainHeader navigation={props.navigation} title={"Chi tiết sản phẩm"}></MainHeader>
            <View style={styles.imgView}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: `${product?.[0]?.infoProduct.linkImg}`,
                    }}
                /></View>
            <View style={styles.infoProduct}>
                <Text style={styles.txtName}>
                    {product?.[0]?.infoProduct.name}
                </Text>
                <Text style={styles.txtPrices}>
                    {product?.[0]?.infoProduct.price.toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND'
                    })}

                </Text>
            </View>
            <View style={styles.productDetail}>
                <Text style={styles.txtHeader}>
                    Chọn thông tin sản phẩm
                </Text>

                <Text style={styles.txtHeader}>
                    Màu sắc
                </Text>

                <Text style={styles.txtHeader}>
                    Size
                </Text>
            </View>
            <View style={styles.productDetail}>
                <Text style={styles.txtHeader}>
                    Mô tả sản phẩm
                </Text>
                <Text style={styles.txtDetail}>
                    {product?.[0]?.infoProduct.describe}
                </Text>
            </View>
            <View style={styles.menu}>
                <TouchableOpacity style={styles.btn} onPress={addToCart}>
                    <Icon name={'cart-plus'} size={25} />
                    <Text style={styles.txtBtn}>Giỏ hàng</Text></TouchableOpacity>
                <TouchableOpacity style={styles.btn}><Text style={styles.txtBtn}>Mua Ngay</Text></TouchableOpacity>
            </View>

        </View>

    )


}
export default ProductDetailScreen;