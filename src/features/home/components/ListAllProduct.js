import React, { useEffect } from "react";
import { FlatList, TouchableOpacity } from 'react-native';
import { useState } from "react";
import axios from "../../../context/axios";
import axiosApiInstance from "../../../context/interceptor";
import ProductItem from "../../../common/components/ProductItem";
import { Text } from "react-native";
function ListAllProduct(props) {
  const [listAllProduct, setAllListProduct] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axiosApiInstance.get(axios.defaults.baseURL + '/api/product/all')
      setAllListProduct([...res.data])
    })()
  }, [])
  return (
    <FlatList
      data={listAllProduct}
      renderItem={({ item, index }) => <ProductItem id={item.id}
        name={item.name}
        price={item.price}
        linkImg={item.linkImg}
        navigation={props}
      />}
      horizontal={false}
      numColumns={3}
      initialNumToRender={10}
      ListFooterComponent={ButtonGoStore}
    />
  )
  function ButtonGoStore() {
    return (<TouchableOpacity style={{marginTop:10, height: 40, width: 120, backgroundColor: '#D9D9D9', borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 16 }}>Đến cửa hàng</Text>
    </TouchableOpacity>)
  }
}

export default ListAllProduct;