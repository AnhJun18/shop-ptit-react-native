import React, { Component, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import InputSpinner from "react-native-input-spinner";
import axios from '../../../context/axios';
import axiosApiInstance from '../../../context/interceptor';
import { Button } from 'react-native';
import Background from "../../../common/components/Background";
import MainHeader from "../../../common/components/MainHeader";
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
        resizeMode:'contain',
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
            width:'72%',
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
        width:'75%',
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
        color:'#ccc',
        opacity:0.5,
        fontSize:30,
    },
    menu: {
        flex: 1,
        backgroundColor: '#B9D8E2',
        height: 60,
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom:0,
    },
    btn: {
        
        width: '95%',
        height: '70%',
        borderRadius: 5,
        backgroundColor: '#4ACBD3',
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtBtn: {
        marginLeft: 10,
        fontSize: 25,
        fontWeight: 500,
        color: '#676161',
    },
    checkBox: {
        height: '30%',             
        width: '8%',       
        backgroundColor: '#FFF',  
        
    }

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
                style={styles.checkBox}
                value={item.selected}
                tintColors={{ true: '#4ACBD3', false: '#777474' }}
                onValueChange={() => handleItemCheck(item.product.infoProduct.id)}
            />}
            <Image
                style={styles.imgProduct}
                source={{
                    uri: `${item.product.infoProduct.linkImg}`,
                }}
            />
            <View  style={styles.infoProduct}>
                 <Text style={styles.txtProduct}>{item.product.infoProduct.name}</Text>
                 <Text style={styles.txtDetail}>Màu: Đen - Size: XL</Text>
                 <View style= {{flexDirection: 'row'}}>
                    <InputSpinner
                        max={100}
                        min={0}
                        step={1}
                        value={item.amount}
                        onChange={(num) => handleChangeAmount(num, item.idCart)}
                        style={styles.spinner}
                        skin={"clean"}
                        color={"#000"}
                        fontSize={14}
                        width={100}
                    />
                    <View style={{ alignItems: 'flex-end', width: '53%'}}>
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
            <FlatList 
                data={listCart}
                renderItem={renderItem}
                keyExtractor={(item) => item.idCart.toString()
                }
                ListFooterComponent={() => {
                    return <Text style={[styles.txtBtn, {marginBottom: 70}]}>Thành tiền: {totalMoney}</Text>
                }}
                ListFooterComponentStyle={{ alignSelf: 'flex-end' }}
            />
           <View style={styles.menu}>
                <TouchableOpacity style={styles.btn} onPress={submitBuy}><Text style={styles.txtBtn}>Tiến Hành Đặt Hàng</Text></TouchableOpacity>
            </View>
        </View>
    );
};

export default CartScreen;