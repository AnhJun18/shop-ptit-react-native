import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { RadioGroup } from "react-native-radio-buttons-group";
import MainHeader from "../../common/components/MainHeader";
import axiosApiInstance from "../../context/interceptor";

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
        borderBottomWidth: 1
    },
    orderContain: {
        backgroundColor: '#DDF2F3',
        marginBottom: 15,
    },
    orderItem: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoDeatil: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 5
    }
    ,
    imgProduct: {
        width: 100,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    btn: {
        height: 30,
        backgroundColor: '#4ACBD3',
        justifyContent: 'center',
        alignItems: 'center'
    },

})
function OrderHistoryScreen(props) {
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
    }, [dataNavBar])

    handleNav = (labelSelected) => {
        setDataNavBar(dataNavBar.map((i) => {
            if (i.label === labelSelected)
                return { ...i, selected: true }
            else
                return { ...i, selected: false }
        }
        ))
    }
    const renderNav = ({ item }) =>
        <TouchableOpacity style={item.selected ? styles.itemNavSelected : styles.itemNav} onPress={() => handleNav(item.label)}>
            <Text style={{ flexWrap: 'nowrap' }}>
                {item.label}
            </Text>
        </TouchableOpacity>



    return (
        <View style={styles.container}>
            <MainHeader title="Đơn mua"></MainHeader>
            <View style={styles.nav}>
                <FlatList
                    data={dataNavBar}
                    renderItem={renderNav}
                    horizontal={true}
                />
            </View>

            {listOrder.length ?
                <FlatList
                    data={listOrder}
                    renderItem={renderOrders}
                    keyExtractor={(item) => item.id.toString()}
                /> :
                <Text>Không có đơn hàng nào!</Text>}
        </View>
    )
}

const renderOrders = ({ item }) => (
    <View style={styles.orderContain}>
        <Text>{item.createdDate}</Text>
        <View style={styles.orderItem}>
            <FlatList
                data={item.orderDetails}
                renderItem={renderItem}
                keyExtractor={(i) => i.id.toString()}
                ListFooterComponent={
                    <TouchableOpacity style={styles.btn}>
                        <Text>Hủy Đơn</Text>
                    </TouchableOpacity>}
            />

        </View>
    </View>

);

const renderItem = ({ item }) => (
    <View style={styles.infoDeatil}>
        <Image
            style={styles.imgProduct}
            source={{
                uri: `${item.productDetail.infoProduct.linkImg}`,
            }}
        />
        <View>
            <Text >{item.productDetail.infoProduct.name}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text >Màu: {item.productDetail.color} - Size: {item.productDetail.size} </Text>
                <View style={{ alignItems: 'flex-end', width: '53%' }}>
                    <Text style={styles.totalPrice}>x {(item.productDetail.infoProduct.price * item.amount).toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND'
                    })}</Text>
                </View>
            </View>

        </View>

    </View>
);

export default OrderHistoryScreen;