import React from "react";
import { ScrollView,FlatList,View,TouchableOpacity,Text} from 'react-native';
import Header from "../components/Header";
import Background from "../../../common/components/Background";
import ComponentsView from "../components/ComponentView";
import Category from "../components/Category";
import ListBestSeller from "../components/ListBestSeller";
import ListBrand from "../components/ListBrand";
import { useEffect } from "react";
import {LogBox} from 'react-native';
import axiosApiInstance from "../../../context/interceptor";
import axios from "../../../context/axios";
import { useState } from "react";
import ProductItem from "../../../common/components/ProductItem";
function ListAllProduct(props) {
    // let searchText = props.SearchReducer;
    // let filter = [...props.FilterReducer.price];
    // let category =[...props.FilterReducer.listCategory];
    const [listAllProduct, setAllListProduct] = useState([]);
    useEffect(() => {
      (async () => {
        const res = await axiosApiInstance.get(axios.defaults.baseURL + '/api/product/all')
        setAllListProduct([...res.data])
      })().then().catch(err=>{
        console.log(err)
      })
    }, [])
    // function search(){
    //   return listAllProduct.filter(item=>{
    //     return (item.name.toLowerCase().includes(searchText.toLowerCase()) && filter[0]<item.price && item.price<filter[1])
    //   }).filter(item=>category.length!=0 ? category.includes(item.category.name.toLowerCase()):true)
    // }
    return (
    
      <FlatList
        data={listAllProduct}
        renderItem={({ item }) => <ProductItem id={item.id}
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
        style={[props.screen != 'Store' ? {} : { marginBottom: 150 }]}
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
function HomeScreen(props) {
    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
      })
    return (
        <ScrollView>
            <Background></Background>
            <Header></Header>
            <ComponentsView
                title={'DANH MỤC SẢN PHẨM'}
                child={Category}
            >
            </ComponentsView>
            <ComponentsView
                title={'SẢN PHẨM BÁN CHẠY'}
                child={ListBestSeller}
                navigation={props.navigation}
            >
            </ComponentsView>
            <ComponentsView
             child={ListBrand}
            >
            </ComponentsView>
            <ComponentsView
                title={'TẤT CẢ SẢN PHẨM'}
                navigation={props.navigation}
                child={ListAllProduct}
            />
            {/* <ListAllProduct/> */}
        </ScrollView>
    )
}
export default HomeScreen;