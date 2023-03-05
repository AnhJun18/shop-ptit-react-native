import React, { useEffect } from "react";
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import { useState } from "react";
import axios from "../../../context/axios";
import axiosApiInstance from "../../../context/interceptor";
import ProductItem from "../../../common/components/ProductItem";
import Icon from "react-native-vector-icons/Feather";
import { Text } from "react-native";
import { View } from "react-native";
import { connect } from "react-redux";
import { RefreshControl } from "react-native";
import { ScrollView } from "react-native";
function ListAllProduct(props) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    (async () => {
      const res = await axiosApiInstance.get(axios.defaults.baseURL + '/api/product/all')
      setAllListProduct([...res.data])
    })().then(()=>{0
    }).catch(err=>{
      Alert.alert('Thông báo','Có lỗi xảy ra')
    }).finally( ()=> setRefreshing(false))
  }, []);
  let searchText = props.SearchReducer;
  let filter = [...props.FilterReducer.price];
  let category =[...props.FilterReducer.listCategory];
  const refresh = props.RefreshStore;
  const [listAllProduct, setAllListProduct] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axiosApiInstance.get(axios.defaults.baseURL + '/api/product/all')
      setAllListProduct([...res.data])
    })().catch(err=>console.log(err))
  }, [])
  function search(){
    return listAllProduct.filter(item=>{
      return (item.name.toLowerCase().includes(searchText.toLowerCase()) && filter[0]<item.price && item.price<filter[1])
    }).filter(item=>category.length!=0 ? category.includes(item.category.name.toLowerCase()):true)
  }
  return (
    search().length> 0 ? 
    <FlatList
      style={{marginBottom:120, marginLeft:10}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={search()}
      renderItem={({ item }) => <ProductItem id={item.id}
        name={item.name}
        price={item.price}
        linkImg={item.linkImg}
        navigation={props}
      />}
      horizontal={false}
      numColumns={3}
      initialNumToRender={10}
    /> :
    <ScrollView style={{height:700, flexDirection:'row',}}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >
      <View style={{marginTop:250,alignItems: 'center',marginLeft:120}}>
        <Text>Không tìm thấy dữ liệu </Text>
        <Icon name={'frown'} size={50} style={{color:'rgba(255,255,255,0.9)'}}/>
      </View>   
    </ScrollView>
  )
 
}

export default connect(state=>{
 return state
})(ListAllProduct);