import React, { Component, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import InputSpinner from "react-native-input-spinner";
import axios from '../../context/axios';
import axiosApiInstance from '../../context/interceptor';
import MainHeader from "../../common/components/MainHeader";
import { ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { Dimensions } from 'react-native';
const CartScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [cartItems, setCartItems] = useState(1)
    const [listCart, setListCart] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [totalMoney, setTotalMoney] = useState(0);
    getCart = async () => {
        const result = await axiosApiInstance.get(axios.defaults.baseURL + '/api/cart/all')
        setListCart(result.data)
    }
    // useEffect(() => {
    //     let tmpMoney = 0
    //     listCart.forEach((item) => {
    //         if (item.selected === true) {
    //             tmpMoney += item.amount * item.product.infoProduct.price
    //         }
    //         setTotalMoney(tmpMoney.toLocaleString('vi', {
    //             style: 'currency',
    //             currency: 'VND'
    //         }))
    //     });
    // }, [listCart])
    useFocusEffect(React.useCallback(() => {
        getCart().then(() => {
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
        })
    }, []))
    const handleItemCheck = (id) => {
        const updatedCartItems = listCart.map((item) => {
            if (item.idCart === id) {
                if (item.selected)
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
        if (myCart.length)
        {   
            dispatch({type:'SET_ORDER',payload:myCart})
            navigation.navigate('OrderScreen')
        } 
        else
            ToastAndroid.show("Chọn sản phẩm để tiếp tục", ToastAndroid.BOTTOM)
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
                    />
                    <View style={styles.disPrices}>
                        <Text>x</Text>
                        <Text style={styles.totalPrice}> {(item.product.infoProduct.price * item.amount).toLocaleString('vi', {
                            style: 'currency',
                            currency: 'VND'
                        })}</Text></View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <MainHeader title="Giỏ hàng" navigation={navigation} screen={'HomeNavigation'}></MainHeader>
            <FlatList
                data={listCart}
                style={{paddingHorizontal:2,marginBottom:50}}
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
                            style={{marginLeft:4}}
                            value={selectAll}
                            tintColors={{ true: '#4ACBD3', false: '#777474' }}
                            onValueChange={() => handleCheckAll()}
                        />}
                        <Text>Tất cả</Text>
                    </View>
                    <Text style={styles.totalPay}>Tổng: {totalMoney}</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={submitBuy}><Text style={styles.txtBtn}>Đặt Hàng</Text></TouchableOpacity>
            </View>
        </View>
    );
};


const {width, height } = Dimensions.get("screen")
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:6,
        paddingHorizontal: height*0.01,
        marginBottom:8,
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderColor:'#ccc',
        shadowOffset:{width:0,height:10},
        shadowOpacity:1,
        shadowRadius:2,
        shadowColor:'#000'
        
    },
    imgProduct: {
        width:width*0.2,
        height:height*0.12,
        resizeMode: 'contain',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoProduct: {
        width: width*0.66,
        flexDirection: 'column',
        padding:5
    },
    txtProduct: {
        flexWrap:'wrap',
        fontSize: 20,
        fontWeight: 400,
        color: '#212121'
    },
    txtDetail: {
        color: '#676161',
        fontSize: 12,
        fontWeight: 400,
        fontStyle:'italic'
    },
    totalPrice: {
        fontSize: 14,
        fontWeight: 400,
        color: '#434',
        fontStyle:'italic'
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
        width: width*0.2,
        opacity: 0.5,
        fontSize: 30,
        fontWeight:'600',
        backgroundColor:'#ffffff00',
        color:'#212121'
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
        fontSize: 14,
        fontWeight: 400,
        color: '#212121',
        alignSelf: 'center',
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
        color:'#212121'
    },
    disPrices:{
        flex:1,
        width: width*0.3,
        flexDirection:'row',
        flexWrap:'nowrap',
        justifyContent:'flex-end',
        alignItems:'center'
    }

});
export default CartScreen;