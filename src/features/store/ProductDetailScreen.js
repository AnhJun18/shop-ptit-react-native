import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Button, Alert, ToastAndroid, ScrollView } from 'react-native';

import axiosApiInstance from "../../context/interceptor";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import axios from "../../context/axios";

function ProductDetailScreen(props) {
    const styles = StyleSheet.create({
        container: {
            position:'relative',
            height: '100%',
            backgroundColor: '#CDF1F1'
        },
        tinyLogo: {
            width:'100%',
            height: 200,
            resizeMode:'contain'
        
        },
        logo: {
            width: 66,
            height: 58,
        },
        txtName: {
            color: '#5A5252',
            fontSize: 26,
            fontWeight: 400
        },
        imgView: {
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
        },
        txtPrices: {
            fontSize: 25,
            fontWeight: 500,
            color: '#5A5252',
        },
        txtDetail: {
            fontSize: 22,
            fontWeight: 600
        },
        infoProduct: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderBottomWidth: 6,
            borderBottomColor: '#BBDADA',
        },
        productDetail: {
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#BBDADA',
        },
        menu: {
            flex: 1,
            flexDirection: "row",
            backgroundColor: '#B9D8E2',
            height: 70,
            width: '100%',
            position: 'absolute',
            // justifyContent: 'space-evenly',
            bottom:0,
        },
        btn: {
            width: '50%',
            height: '100%',
            backgroundColor: '#4ACBD3',
            borderColor: '#B9D8E2',
            borderWidth: 1.5,
            borderStyle: 'solid',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',

        },
        txtBtn: {
            marginLeft: 10,
            fontSize: 25,
            fontWeight: 600,
            color: '#676161'
        },
        txtHeader: {
            fontSize: 23,
            color: '#676161',
            fontWeight: 600
        },
        txttext: {
            fontSize: 20,
            color: '#777474',
            fontWeight: 450
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
            <ScrollView >
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
                        Mô tả sản phẩm
                    </Text>

                    <Text style={styles.txttext}>
                        {product?.[0]?.infoProduct.describe}
                    </Text>
                </View>
                <View style={styles.productDetail}>
                    <Text style={styles.txtHeader}>
                        Chọn thông tin sản phẩm
                    </Text>

                    <Text style={styles.txttext}>
                        Màu sắc
                    </Text>
                    <Text style={styles.txttext}>
                        Màu sắc
                    </Text>
                    <Text style={styles.txttext}>
                        Màu sắc
                    </Text>
                    <Text style={styles.txttext}>
                        Màu sắc
                    </Text>
                    <Text style={styles.txttext}>
                        Màu sắc
                    </Text>
                    
                    <Text style={styles.txttext}>
                        Size
                    </Text>
                </View>
                <RadioButtonGroup>
                    
                </RadioButtonGroup>

            </ScrollView>
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