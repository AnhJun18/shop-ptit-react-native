import React, { Component, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import InputSpinner from "react-native-input-spinner";
import axios from '../../../context/axios';
import axiosApiInstance from '../../../context/interceptor';
import { Button } from 'react-native';
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
        paddingVertical: 20,
        paddingHorizontal: '8%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    imgProduct: {
        width: '15%',
        height: '100%',
        resizeMode:'contain',
        backgroundColor:'#ffc'
    },
    infoItem: {
        backgroundColor: "#ccc",
        width: '40%'
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',


    },
    infoProduct:{
            width:'35%',
            backgroundColor:'#ff2'
    },
    itemPrice: {
        width:'15%',
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
        width:'30%',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 40,
        backgroundColor:'#ccc'
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
        width: '10%',
        color:'#ccc',
        opacity:0.5,
        fontSize:30
    },
    btn: {
        width: '100%',
        height: 80,
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

});

const CartScreen = ({navigation}) => {
    const [cartItems, setCartItems] = useState(1)
    const [listCart, setListCart] = useState([])

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
            if (item.product.infoProduct.id === id) {
                return { ...item, selected: !item.selected };
            }
            return item;
        });
        setListCart(updatedCartItems);
    };
    const handleChangeAmount = (id, itemChange) => {
        const updatedCartItems = listCart.map((item) => {
            if (item.idCart === itemChange) {
                item.amount = id
                return { ...item };
            }
            return item;
        });
        setListCart(updatedCartItems);
    };

    submitBuy = () => {
        const myCart = []
        listCart.forEach((item) => {
            if (item.selected === true) {
                myCart.push(item)
            }
        });
        console.log(myCart)
        navigation.navigate('OrderScreen',{data:myCart})
    }

    const renderItem = ({ item }) => (
        <View style={styles.orderItem}>
            
            {<CheckBox
                style={{width:'10%',backgroundColor:'#ccc'}}
                value={item.selected}
                onValueChange={() => handleItemCheck(item.product.infoProduct.id)}
            />}
            <Image
                style={styles.imgProduct}
                source={{
                    uri: `${item.product.infoProduct.linkImg}`,
                }}
            />
            <View  style={styles.infoProduct}>
                 <Text>{item.product.infoProduct.name}</Text>
            </View>
           
            <InputSpinner
                max={100}
                min={0}
                step={1}
                value={item.amount}
                onChange={(num) => handleChangeAmount(num, item.idCart)}
                style={styles.spinner}
                skin={"clean"}
                color={"#000"}
                fontSize={10}
                width={1000}
            />
            
            <Text style={styles.totalPrice}>{(item.product.infoProduct.price * item.amount).toLocaleString('vi', {
                style: 'currency',
                currency: 'VND'
            })}</Text>


        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={listCart}
                renderItem={renderItem}
                keyExtractor={(item) => item.idCart.toString()
                }
                ListFooterComponent={() => {
                    return <Text style={styles.txtBtn}>Thành tiền: {totalMoney}</Text>
                }}
                ListFooterComponentStyle={{ alignSelf: 'flex-end' }}
            />
           
            <TouchableOpacity style={styles.btn} onPress={submitBuy}><Text style={styles.txtBtn}>Đặt Hàng</Text></TouchableOpacity>

        </View>
    );
};

export default CartScreen;