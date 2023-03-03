import React, { useEffect } from "react";
import { FlatList, ActivityIndicator } from 'react-native';
import { useState } from "react";
import axiosApiInstance from "../../../context/interceptor";
import axios from "../../../context/axios";
import ProductItem from "../../../common/components/ProductItem";
import { View } from "react-native";
function ListBestSeller(props) {
  console.log(props.refreshing)
  const [listProduct, setListProduct] = useState([]);
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    (async () => {
      setLoaded(false)
      const res = await axiosApiInstance.get(axios.defaults.baseURL + '/api/product/best-seller')
      setLoaded(true)
      setListProduct([...res.data])
    })()
  }, [])
  return (
    <View>
      {listProduct.length ?
        <FlatList
          data={listProduct}
          renderItem={({ item, index }) =>
            <ProductItem id={item.id}
              name={item.name}
              price={item.price}
              linkImg={item.linkImg}
              navigation={props.navigation}
            />}
          horizontal={true}
        />
        :
        <ActivityIndicator
          color="#DE0F3F"
          size="large"
          style={{ alignSelf: "center" }} />
      }

    </View>
  )


}
export default ListBestSeller;