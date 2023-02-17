import React, { useEffect } from "react";
import { FlatList } from 'react-native';
import {useState } from "react";
import axiosApiInstance from "../../../context/interceptor";
import axios from "../../../context/axios";
import ProductItem from "../../../common/components/ProductItem";
function ListBestSeller(props) { 
    const [listProduct,setListProduct]= useState([]);
    useEffect(()=>{
          (async ()=>{
            const res= await axiosApiInstance.get(axios.defaults.baseURL+'/api/product/best-seller')
            setListProduct([...res.data])
          })()
    },[])
    return (
            <FlatList
                data={listProduct}
                renderItem={({ item, index }) => <ProductItem id={item.id}
                name={item.name}
                price={item.price}
                linkImg={item.linkImg}
                navigation= {props}
                />}
                horizontal={true}
            />
    )
}
export default ListBestSeller;