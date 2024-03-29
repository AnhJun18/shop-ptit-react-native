import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image, TextInput } from 'react-native';
import MainHeader from '../../../common/components/MainHeader';
import { ScrollView } from 'react-native';
import AddressButton from '../components/AddressButton';
import style from '../style/address';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from 'react-native';
import axios from '../../../context/axios';
import axiosApiInstance from '../../../context/interceptor';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { navigate } from '../../../navigations/RootNavigation';
function OrderScreen(props) {
    const listItem = props.state.OrderReducer;
    const navigation = props.navigation;
    const Address =  props.state.AddressReducer;
    let money=0
    listItem.forEach((item=> money += item.amount * item.product.infoProduct.price))
    const [userInfo, setUserInfo] = useState({});
    const [note, setNote] = useState({});    
    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        (async () => {
            setUserInfo(JSON.parse(await AsyncStorage.getItem('@userInfo')));
            LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        })().catch(err => console.log(err))
    }, [])
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#DDF2F3' }}>
            <MainHeader title={'Đặt hàng'} navigation={navigation} screen={'Cart'}></MainHeader>
            <AddressButton navigation={navigation}></AddressButton> 
            <View style={style.container}>
                <Text style={style.title}>Hình thức vận chuyển</Text>
                <Text style={style.text}>Giao hàng tận nơi: 30.000đ</Text>
                <Text style={style.text}>Thời gian giao hàng dự kiến từ 3 ~ 4 ngày, có thể lâu hơn vì các vấn đề bất khả kháng, mong Quý KH đợi đơn hàng giúp shop. Chân thành cảm ơn</Text>
            </View>
            <View style={style.container}>
                <TextInput
                placeholder='Ghi chú'
                multiline
                numberOfLines={2}
                onChange={text=>{setNote(text)}}></TextInput>
            </View>
            <View style={style.container}>
                <Text style={style.title}>Hình thức thanh toán</Text>
                <Text style={style.text}>Thanh toán khi nhận hàng</Text>
            </View>
            <Text style={[style.title, { margin: 10 }]}>Thông tin đơn hàng</Text>
            {InfoOrder()}
        </ScrollView>
    )
    function InfoOrder() {
        return <FlatList
            data={listItem}
            renderItem={({ item, index }) => <OrderItem item={item} />}
            horizontal={false}
            ListFooterComponent={Order}
            ListFooterComponentStyle={{ width: '100%', marginTop: 30 }}
        >
        </FlatList>

        function Order() {
            return (<View style={{ alignContent: 'center', alignItems: 'center' }} >
                <View style={[styleOrder.textItem, { borderBottomWidth: 0.5, width: '90%' }]}>
                    <Text style={[style.textDH, { marginRight: 70 }]}>Tạm tính:</Text>
                    <Text style={style.textDH}>{(money).toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND'
                    })}</Text>
                </View>
                <View style={[styleOrder.textItem, { borderBottomWidth: 0.5, width: '90%' }]}>
                    <Text style={[style.textDH, { marginRight: 70 }]}>Phí ship:</Text>
                    <Text style={style.textDH}>{(30000).toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND'
                    })}</Text>
                </View>
                <View style={[styleOrder.textItem, { width: "90%" }]}>
                    <Text style={[style.textDH, { marginRight: 70 }]}>Tổng tiền:</Text>
                    <Text style={style.textDH}>{(money+30000).toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND'
                    })}</Text>
                </View>
                <View style={{ width: '100%', marginLeft: 7 }}>
                    <TouchableOpacity style={{
                        backgroundColor: '#4ACBD3',
                        height: 45, width: '97%', justifyContent: "center", alignItems: 'center', marginBottom: 10,
                        borderRadius: 10
                    }}
                        onPress={SendOrder}
                    >
                        <Text style={{ fontSize: 19, fontWeight: '600', textAlign: 'justify', color: '#4E4B4B' }}>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>)

        }
    }
    function OrderItem({ item }) {
        const info = item.product.infoProduct
        const name = info.name;
        const linkImg = info.linkImg;
        const amout = item.amount;
        const id = item.product.id;
        const price = info.price;
        const size = item.product.size;
        const color = item.product.color;
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
                                <Text style={styleItem.textItem} numberOfLines={1}>Size: {size}</Text>
                                <Text style={styleItem.textItem} numberOfLines={1}>Màu: {color}</Text>
                            </View>
                            <View style={{ right: -50 }}>
                                <Text style={styleItem.textItem} numberOfLines={1}>{amout} x {price.toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }
   
    async function SendOrder() {

        let body = {
            nameReceiver: Address?.address? Address.name: userInfo.firstName + ' ' + userInfo.lastName,
            address: Address?.address? Address.address: userInfo.address,
            phoneReceiver: Address?.address? Address.phone: userInfo.phone,
            feeShip: 30.000,
            note: '',
            listProduct: listItem.map((item, index) => {
                return {
                    product_id: item.product.id,
                    amount: item.amount
                }
            })
        }
        axiosApiInstance.post(
            axios.defaults.baseURL + "/api/order/create",
            body)
            .then(res => {
                console.log(res.data)
                if (res.data.status) {
                    Alert.alert('Thông báo', 'Đặt hàng thành công');
                    navigate("HomeNavigation")
                } else {
                    Alert.alert('Thông báo', res.data.message);
                }
            }).catch(err => {
                Alert.alert('Thông báo', 'Đặt hàng thất bại');
            })
    }
}
const styleOrder = StyleSheet.create({
    textItem: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',

        width: 250,
        marginBottom: 10
    }
})
const styleItem = StyleSheet.create({
    textItem: {
        maxWidth: 114,
        fontSize: 15,
        color: 'black'
    }

})
export default connect((state)=>{return {state:state}})(OrderScreen)