import React, { useEffect } from "react";
import { FlatList, TouchableOpacity } from 'react-native';
import { useState } from "react";
import axios from "../../../context/axios";
import axiosApiInstance from "../../../context/interceptor";
import ProductItem from "../../../common/components/ProductItem";
import { useFocusEffect } from "@react-navigation/native";
import { Text } from "react-native";
import { View } from "react-native";
import { connect } from "react-redux";
function ListAllProduct(props) {
  let searchText = props.SearchReducer;
  let filter = [...props.FilterReducer]
  console.log(filter,searchText)
  const [listAllProduct, setAllListProduct] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axiosApiInstance.get(axios.defaults.baseURL + '/api/product/all')
      setAllListProduct([...res.data])
    })()
  }, [])
  function search(){
    return listAllProduct.filter(item=>{
      return (item.name.toLowerCase().includes(searchText.toLowerCase()) && filter[0]<item.price && item.price<filter[1])
    })
  }
  return (
    <FlatList
      data={search()}
      renderItem={({ item, index }) => <ProductItem id={item.id}
        name={item.name}
        price={item.price}
        linkImg={item.linkImg}
        navigation={props}
      />}
      horizontal={false}
      numColumns={3}
      initialNumToRender={10}
      ListFooterComponent={props.screen != 'Store' ? ButtonGoStore : null}
      ListFooterComponentStyle={{ justifyContent: 'center', alignItems: 'center',backgroundColor:'black',width:'100%' }}
      style={props.screen != 'Store' ? {} : { marginBottom: 150 }}
    />
  )
  function ButtonGoStore() {
    return (
      <View style={{width:'100%'}}>
        <TouchableOpacity
          style={{ marginTop: 10, height: 40, width: 120, backgroundColor: '#D9D9D9', borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 16 }}>Đến cửa hàng</Text>
        </TouchableOpacity>
      </View>)
  }
}

export default connect(state=>{
 return state
})(ListAllProduct);