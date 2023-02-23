import React, { useEffect, useState } from 'react';
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    imgProduct: {
        width: 200,
        height: 200
    },
    infoItem: {
        backgroundColor: "#ccc",
        width: '40%'
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',


    },
    itemPrice: {
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
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
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
        width: 100,
        height: 50,
    }
});

const CartScreen = () => {
    const [cartItems, setCartItems] = useState(1)
    const [listCart, setListCart] = useState([])

    const [value, setValue] = useState(1);
    getCart = async () => {
        const result = await axiosApiInstance.get(axios.defaults.baseURL + '/api/cart/all')
        setListCart(result.data)
    }
    useEffect(() => {
        getCart()
    }, [])


    const handleItemCheck = (id) => {
        const updatedCartItems = listCart.map((item) => {
            console.log(id)
            if (item.product.infoProduct.id === id) {

                return { ...item, selected: !item.selected };
            }
            return item;
        });
        console.log(updatedCartItems)
        setListCart(updatedCartItems);
    };
    const handleChangeAmount = (id,itemChange) => {
        const updatedCartItems = listCart.map((item) => {
            if (item.idCart === itemChange) {
                item.amount=id
                return { ...item};
            }
            return item;
        });
        setListCart(updatedCartItems);
    };

    submitBuy=()=>{
        const myCart = []
        listCart.forEach((item) => {
            if (item.selected === true) {
                updatedCartItems.push(item)
            }
        });
       console.log(myCart)
    }

    const renderItem = ({ item }) => (
        <View style={styles.orderItem}>
            {<CheckBox
                value={item.selected}
                onValueChange={() => handleItemCheck(item.product.infoProduct.id)}
            />}
            <Image
                style={styles.imgProduct}
                source={{
                    uri: `${item.product.infoProduct.linkImg}`,
                }}
            />
           
            <InputSpinner
                max={10}
                min={1}
                step={1}
                value={item.amount}
                onChange={(num)=> handleChangeAmount(num,item.idCart)}
                style={styles.spinner}
                skin={"clean"}
                colorMax={"#f04048"}
                colorMin={"#40c5f4"}
                color={"#000"}
            />
            <Text style={styles.totalPrice}>{item.product.infoProduct.price * item.amount}</Text>
            
            
        </View>
    );

    return (
        <View style={styles.container}>

            <FlatList
                data={listCart}
                renderItem={renderItem}
                keyExtractor={(item) => item.idCart.toString()}
            />
            <TouchableOpacity style={styles.btn} onPress={submitBuy}><Text style={styles.txtBtn}>Dat Hang</Text></TouchableOpacity>
           
        </View>
    );
};

export default CartScreen;