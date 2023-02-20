import React from 'react';
import { View,Text, SafeAreaView } from 'react-native';
import MainHeader from '../../../common/components/MainHeader';
import Background from '../../../common/components/Background';
import { ScrollView } from 'react-native';
import AddressButton from '../components/AddressButton';
import style from '../style/address';
import OrderItem from '../../../common/components/OrderItem'
import InfoOrder from '../components/InfoOrder';
import { useEffect } from 'react';
import {LogBox} from 'react-native';
function OrderScreen(props){
    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
      })
   return (
    <ScrollView contentContainerStyle={{ flexGrow: 1,backgroundColor:'#DDF2F3' }}>
        {/* <Background></Background> */}
        <MainHeader title={'Đặt hàng'}></MainHeader>
        <AddressButton></AddressButton>
        <View style={style.container}>
            <Text style={style.title}>Hình thức vận chuyển</Text>
            <Text>Giao hàng tận nơi: 30.000đ</Text>
            <Text>Thời gian giao hàng dự kiến từ 3 ~ 4 ngày, có thể lâu hơn vì các vấn đề bất khả kháng, mong Quý KH đợi đơn hàng giúp shop. Chân thành cảm ơn</Text>
        </View>
        <View style={style.container}>
            <Text style={style.title}>Hình thức thanh toán</Text>
            <Text>Thanh toán khi nhận hàng</Text>
        </View>
        
            <Text style={[style.title,{margin:10}]}>Thông tin đơn hàng</Text>
            <InfoOrder/>
        
    </ScrollView>
   )
}
export default OrderScreen;