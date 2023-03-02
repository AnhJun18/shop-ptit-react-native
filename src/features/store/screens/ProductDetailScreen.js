import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Button, Alert, ToastAndroid, ScrollView } from 'react-native';
import axiosApiInstance from "../../../context/interceptor";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "../../../context/axios";
import MainHeader from "../../../common/components/MainHeader";
import RadioGroup from 'react-native-radio-buttons-group';
import InputSpinner from "react-native-input-spinner";
import { useFocusEffect } from "@react-navigation/native";

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
        backgroundColor: '#CDF1F1',
    },
    tinyLogo: {
        width: '100%',
        height: 200,
        resizeMode: 'contain'

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
        bottom: 0,
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
        fontWeight: 400
    },
    mb: {
        marginBottom: 50
    }, spinner: {
        width: '40%',
        color: '#ccc',
        opacity: 0.5,
        fontSize: 20
    },
    txtWarning: {
        color: '#ff000',
        fontStyle: 'italic',
        fontSize: 12,
        fontWeight: 300
    }
});
function ProductDetailScreen(props) {


    const [itemID, setItemID] = useState(null)
    const [load, setLoad] = useState(false)
    const [product, setProduct] = useState([]);
    const [radioColor, setRadioColor] = useState([]);
    const [radioSize, setRadioSize] = useState([]);
    const [quantity, setQuantity] = useState(1);

    function onPressColorButton(radioButtonsArray) {
        const colorSelected = (radioButtonsArray.filter((i) => { return i.selected === true }))
        product.map((i) => {
            if (i === colorSelected.value)
                return { i }
        })
        getSize(colorSelected[0].value)

    }

    function onPressSizeButton(radioButtonsArray) {
    }
    getColor = () => {
        setRadioColor(Array.from(new Set(product.map((item) => {
            return item.color
        }))).map((i) => { return { id: i, label: i, value: i } }))
    }
    getSize = (color) => {
        setRadioSize(product.filter((item) => {
            if (item.color === color)
                return true
            else
                return false
        }).map((i) => { return { id: i.size, label: i.size, value: i.size } }))
    }
    getProduct = async () => {
        const apiResponse = await axiosApiInstance.get(axios.defaults.baseURL + `/api/product/detail/${itemID}`);
        setProduct(apiResponse.data)
        getColor()
        setLoad(true)
    }

    function findProductID() {
        const [colorSelected] = (radioColor.filter((i) => {
            if (i.selected === false) return false
            else return true
        }).map((i) => { return i.value }))

        const [sizeSelected] = (radioSize.filter((i) => {
            if (i.selected) return true
            else return false
        }).map((i) => { return i.value }))

        if (colorSelected && sizeSelected) {
            return (product.filter((item) => {
                if (item.color === colorSelected && item.size === sizeSelected)
                    return true
                else
                    return false
            }).map((i) => { return i }))

        }
        return null
    }
    addToCart = async () => {
        const productSelected = findProductID()

        if (productSelected) {
            const body = {
                "productID": productSelected[0]?.id,
                "amount": quantity
            }
            const result = await axiosApiInstance.post(axiosApiInstance.defaults.baseURL + `/api/cart/AddToCart`, body);
            if (result.data.status == 200)
                ToastAndroid.show("Sản phẩm đã được thêm vào giỏ hàng thành công", ToastAndroid.SHORT)
            else
                ToastAndroid.show(`Lỗi: ${result.data.message}`, ToastAndroid.SHORT)
        }
        else
            ToastAndroid.show("Vui long chọn thông tin sp", ToastAndroid.SHORT)


    }

    useEffect(() => {
        setLoad(false)
        getProduct()

    }, [itemID])

    useFocusEffect(() => {
        setItemID(props.route.params.itemID)
    })


    return (
        <View style={styles.container}>
            <MainHeader title='Chi tiết sản phẩm'></MainHeader>
            {load ?
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

                    <View style={[styles.productDetail]}>
                        <Text style={styles.txtHeader}>
                            Chọn thông tin sản phẩm
                        </Text>

                        <Text style={styles.txttext}>
                            Màu sắc
                        </Text>

                        <RadioGroup
                            radioButtons={radioColor}
                            onPress={onPressColorButton}
                            layout='row'
                        />


                        {radioSize ?
                            <View>
                                <Text style={[styles.txttext]}>
                                    Size
                                </Text>
                                <RadioGroup
                                    radioButtons={radioSize}
                                    onPress={onPressSizeButton}
                                    layout='row' />
                            </View> :
                            <Text style={[styles.txtWarning]}>
                                Vui lòng chọn màu
                            </Text>
                        }
                        <Text style={[styles.txttext]}>
                            Số lượng
                        </Text>
                        <InputSpinner
                            max={100}
                            min={1}
                            step={1}
                            value={quantity}
                            onChange={(num) => { setQuantity(num) }}
                            style={styles.spinner}
                            skin={"clean"}
                            color={"#000"}
                            fontSize={10}
                            width={1000}
                        />
                    </View>
                    <View style={[styles.productDetail, styles.mb]}>
                        <Text style={styles.txtHeader}>
                            Mô tả sản phẩm
                        </Text>

                        <Text style={styles.txttext}>
                            {product?.[0]?.infoProduct.describe}
                        </Text>
                    </View>
                </ScrollView>

            : <Text>Loading</Text>}
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