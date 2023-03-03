import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { RadioGroup } from "react-native-radio-buttons-group";
import Moment from 'moment';
import MainHeader from "../../common/components/MainHeader";
import axiosApiInstance from "../../context/interceptor";


function OrderHistoryScreen(props) {
    const navigation = props.navigation;
    const [referesh,setRefresh]= useState(false)
    const [dataNavBar, setDataNavBar] = useState([
        {
            id: '1',
            label: 'Chờ xác nhận',
            selected: true
        },
        {
            id: '2',
            label: 'Đang vận chuyển',
        },
        {
            id: '3',
            label: 'Đã Hủy',
        }
        ,
        {
            id: '4',
            label: 'Đã Thanh Toán',
        }
        ,
        {
            id: '5',
            label: 'Đang Chuẩn Bị Hàng',
        }
    ])
    const [listOrder, setlistOrder] = useState([])
    getCart = async () => {
        const statusSelected = (dataNavBar.filter((i) => {
            if (i.selected === true) return true
            else return false
        })[0].label)
        const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/order/status=${statusSelected}`)
        setlistOrder(result.data)
    }
    useEffect(() => {
        getCart()
    }, [dataNavBar,referesh])

    handleNav = (labelSelected) => {
        setDataNavBar(dataNavBar.map((i) => {
            if (i.label === labelSelected)
                return { ...i, selected: true }
            else
                return { ...i, selected: false }
        }
        ))
    }
    const renderOrders = ({ item }) => (
        <View style={styles.orderContain}>
            <Text style={styles.txtOrderDetail}>{Moment(item.createdDate).format('DD-MM-YYYY HH:mm')}</Text>
            <View style={styles.orderItem}>
                <FlatList
                    data={item.orderDetails}
                    renderItem={renderItem}
                    keyExtractor={(i) => i.id.toString()}
                    ListFooterComponent={
                        <TouchableOpacity style={styles.btn} onPress={()=>CancelOrder(item.id)}>
                            <Text style={styles.txtBtn}>Hủy Đơn</Text>
                        </TouchableOpacity>}
                />
            </View>
        </View>
    
    );
    const renderNav = ({ item }) =>
        <TouchableOpacity style={item.selected ? styles.itemNavSelected : styles.itemNav} onPress={() => handleNav(item.label)}>
            <Text style={{ flexWrap: 'nowrap', color: '#676161' }}>
                {item.label}
            </Text>
        </TouchableOpacity>
    return (
        <View style={styles.container}>
            <MainHeader title="Đơn mua" navigation={navigation} screen={'Profile'}></MainHeader>
            <View style={styles.nav}>
                <FlatList
                    data={dataNavBar}
                    renderItem={renderNav}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            {listOrder.length ?
                <FlatList
                    data={listOrder}
                    renderItem={renderOrders}
                    keyExtractor={(item) => item.id.toString()}
                /> :
                <View style={styles.noOrderView}>
                    <Text style={{textAlign:'center'}}>Không có đơn hàng nào!</Text>
                </View>}
        </View>
    )
  
    function CancelOrder(id){
        (async ()=>{
            const result = await axiosApiInstance.delete(`/api/order/cancel_order?order_id=${id}`);
           setRefresh(!referesh)
        })().catch(err=>console.log(err))
    }

}



const renderItem = ({ item }) => (
    <View style={styles.infoDetail}>
        <Image
            style={styles.imgProduct}
            source={{
                uri: `${item.productDetail.infoProduct.linkImg}`,
            }}
        />
        <View style={{marginLeft:16}}>
            <Text style={styles.txtProduct}>{item.productDetail.infoProduct.name}</Text>
            <Text style={styles.txtDetail} >Màu: {item.productDetail.color} - Size: {item.productDetail.size} </Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.txtDetail, {width: '30%'}]}>Số lượng:  {item.amount} </Text>
                <View style={{ alignItems: 'flex-end', width: '50%' }}>
                    <Text style={styles.txtDetail}>x {(item.productDetail.infoProduct.price * item.amount).toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND'
                    })}</Text>
                </View>
            </View>
        </View>
    </View>
);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    itemNav: {
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4
    },
    itemNavSelected: {
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
        borderColor: '#ff0000',
        borderBottomWidth: 1,
    },
    noOrderView:{
        flex:1,
        justifyContent: 'center',
        textAlign:"center",
    },
    orderContain: {
        backgroundColor: '#DDF2F3',
        marginBottom: 15,
        padding: 10,
    },
    orderItem: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoDetail: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 5,
        marginBottom:2,
    }
    ,
    imgProduct: {
        width: 100,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    btn: {
        height: 30,
        width: '96%',
        backgroundColor: '#4ACBD3',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '2%',
        borderRadius: 5,
        marginBottom: 7,
        marginTop:5,
        
    },
    txtBtn: {
        fontSize: 20,
        fontWeight: 450,
        color: '#676161',
        marginRight: 45,
        marginLeft: 45,
    },
    txtProduct: {
        fontSize: 18,
        fontWeight: 400,
        color: '#676161',
    },
    txtDetail: {
        color: '#676161',
        fontSize: 12,
        fontWeight: 300,
        fontStyle: "italic"
    },
    txtOrderDetail: {
        fontSize:13,
        color: '#00000',
        fontWeight:"bold",
        marginBottom:2,
    }

})
export default OrderHistoryScreen;