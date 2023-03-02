import React, { Component, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import InputSpinner from "react-native-input-spinner";
<<<<<<< HEAD:src/features/home/screen/SettingScreen.js
import axios from '../../../context/axios';
import axiosApiInstance from '../../../context/interceptor';
import MainHeader from "../../../common/components/MainHeader";
=======
import axios from '../../context/axios';
import axiosApiInstance from '../../context/interceptor';
import { Button } from 'react-native';
import Background from "../../common/components/Background";
import MainHeader from "../../common/components/MainHeader";
import { ToastAndroid } from 'react-native';
>>>>>>> 3697580321abdab4d04159ce935c2af9ec648e11:src/features/cart/CartScreen.js
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: '4%',
        borderBottomWidth: 3,
        borderBottomColor: '#DDF2F3',
    },
    imgProduct: {
        width: '30%',
        height: '270%',
        resizeMode: 'contain',
    },
    infoItem: {
        backgroundColor: "#ccc",
        width: '40%'
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',


    },
    infoProduct: {
        width: '72%',
        flexDirection: 'column',
        marginLeft: 3
    },
    txtProduct: {
        fontSize: 20,
        fontWeight: 400,
        color: '#676161'
    },
    txtDetail: {
        color: '#676161',
        fontSize: 15,
        fontWeight: 300,
    },
    itemPrice: {
        width: '15%',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ff6347',

    },
    itemQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityText: {
        marginHorizontal: 10,
    },
    totalPrice: {
        width: '75%',
        fontSize: 18,
        fontWeight: 400,
        color: '#676161',
        marginTop: 13,
        // flexDirection: 'column-reverse',


    },

    checkoutButton: {
        backgroundColor: '#ff6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    spinner: {
        flexDirection: 'row',
        marginLeft: 5,
        width: '37%',
        color: '#ccc',
        opacity: 0.5,
        fontSize: 30,
    },
    menu: {
        flex: 1,
        position: 'absolute',
        flexDirection: 'row',
        height: '8%',
        bottom: 0,
        backgroundColor: '#B9D8E2',
        width: '100%',
        alignItems: 'center'
    },
    infoPay: {
        flex: 7,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    totalPay: {
        fontSize: 16,
        fontWeight: 400,
        color: '#676161',
        alignSelf: 'center'
    },
    btn: {
        flex: 3,
        backgroundColor: '#4ACBD3',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'


    },
    txtBtn: {
        fontSize: 18,
        fontWeight: 500,
    },
    checkBox: {
        height: '30%',
        width: '8%',
        backgroundColor: '#FFF',

    }

});

const CartScreen = ({ navigation }) => {
    const [cartItems, setCartItems] = useState(1)
    const [listCart, setListCart] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [totalMoney, setTotalMoney] = useState(0);
    getCart = async () => {
        const result = await axiosApiInstance.get(axios.defaults.baseURL + '/api/cart/all')
        setListCart(result.data)
    }
    useEffect(() => {
        let tmpMoney = 0
        listCart.forEach((item) => {
            if (item.selected === true) {
                tmpMoney += item.amount * item.product.infoProduct.price
            }
            setTotalMoney(tmpMoney.toLocaleString('vi', {
                style: 'currency',
                currency: 'VND'
            }))
        });
    }, [listCart])

    useEffect(() => {
        getCart()
    }, [])
    const handleItemCheck = (id) => {
        const updatedCartItems = listCart.map((item) => {
            if (item.idCart === id) {
                if(item.selected)
                    setSelectAll(false)
                return { ...item, selected: !item.selected };
            }
            return item;
        });
        setListCart(updatedCartItems);
    };

    const handleChangeAmount = (num, itemChange, idProduct) => {
        const updatedCartItems = listCart.map((item) => {
            if (item.idCart === itemChange) {
                item.amount = num
                return { ...item };
            }
            return item;
        });
        setListCart(updatedCartItems);
        handleUpdateCart(idProduct, num)
    };


    const handleCheckAll = (() => {

        const updatedCartItems = listCart.map((item) => {
            return { ...item, selected: !selectAll };

            return item;
        });
        setListCart(updatedCartItems);
        setSelectAll(!selectAll)
    })

    handleUpdateCart = async (idCart, amountNew) => {
        const body = {
            "productID": idCart,
            "amount": amountNew
        }
        await axiosApiInstance.put(axiosApiInstance.defaults.baseURL + `/api/cart/update`, body);

    }
    submitBuy = () => {
        const myCart = []
        listCart.forEach((item) => {
            if (item.selected === true) {
                myCart.push(item)
            }
        });
        if(myCart.length)
             navigation.navigate('OrderScreen',{data:myCart})
        else
            ToastAndroid.show("Chọn sản phẩm để tiếp tục",ToastAndroid.BOTTOM)
    }

    const renderItem = ({ item }) => (
        <View style={styles.orderItem}>

            {<CheckBox
                style={styles.checkBox}
                value={item.selected}
                tintColors={{ true: '#4ACBD3', false: '#777474' }}
                onValueChange={() => handleItemCheck(item.idCart)}
            />}
            <Image
                style={styles.imgProduct}
                source={{
                    uri: `${item.product.infoProduct.linkImg}`,
                }}
            />
            <View style={styles.infoProduct}>
                <Text style={styles.txtProduct}>{item.product.infoProduct.name}</Text>
                <Text style={styles.txtDetail}>Màu: {item.product.color} - Size: {item.product.size} </Text>
                <View style={{ flexDirection: 'row' }}>
                    <InputSpinner
                        max={100}
                        min={0}
                        step={1}
                        value={item.amount}
                        onChange={(num) => handleChangeAmount(num, item.idCart, item.product.id)}
                        style={styles.spinner}
                        skin={"clean"}
                        color={"#000"}
                        fontSize={14}
                        width={100}
                    />
                    <View style={{ alignItems: 'flex-end', width: '53%' }}>
                        <Text style={styles.totalPrice}>x {(item.product.infoProduct.price * item.amount).toLocaleString('vi', {
                            style: 'currency',
                            currency: 'VND'
                        })}</Text></View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <MainHeader title="Giỏ hàng"></MainHeader>
            <FlatList
                data={listCart}
                renderItem={renderItem}
                keyExtractor={(item) => item.idCart.toString()
                }
                ListFooterComponent={() => {

                }}
                ListFooterComponentStyle={{ alignSelf: 'flex-end' }}
            />
            <View style={styles.menu}>
                <View style={styles.infoPay}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {<CheckBox
                            value={selectAll}
                            tintColors={{ true: '#4ACBD3', false: '#777474' }}
                            onValueChange={() => handleCheckAll()}
                        />}
                        <Text>Tất cả</Text>
                    </View>
                    <Text style={styles.totalPay}>Thành tiền: {totalMoney}</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={submitBuy}><Text style={styles.txtBtn}>Đặt Hàng</Text></TouchableOpacity>
            </View>
        </View>
    );
};

export default CartScreen;