import React, { useCallback } from "react";
import { ScrollView, FlatList, View, TouchableOpacity, Text } from 'react-native';
import Header from "../components/Header";
import Background from "../../../common/components/Background";
import ComponentsView from "../components/ComponentView";
import Category from "../components/Category";
import ListBestSeller  from "../components/ListBestSeller";
import ListBrand from "../components/ListBrand";
import { useEffect } from "react";
import { LogBox, RefreshControl } from 'react-native';
import axiosApiInstance from "../../../context/interceptor";
import axios from "../../../context/axios";
import { useState } from "react";
import ProductItem from "../../../common/components/ProductItem";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native";
const  ListAllProduct  = connect(state => { return { state: state } })((props) => {
  const [listAllProduct, setAllListProduct] = useState([]);
  const refresh= props.state.RefreshHome;
  useEffect(() => {
    (async () => {
      const res = await axiosApiInstance.get(axios.defaults.baseURL + '/api/product/all')
      setAllListProduct([...res.data])
    })().then().catch(err => {
      console.log(err)
    })
  }, [refresh.refresh])

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
      ListFooterComponentStyle={{ justifyContent: 'center', alignSelf: 'center' }}
      style={[props.screen != 'Store' ? {} : { marginBottom: 150 }]}
    />
  )
  function ButtonGoStore() {
    return (
      <View style={{ width: '100%' }}>
        <TouchableOpacity
          style={{ marginTop: 10, height: 40, width: 120, backgroundColor: '#D9D9D9', borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 16 }}>Đến cửa hàng</Text>
        </TouchableOpacity>
      </View>)
  }
})
function HomeScreen(props) {
  const dispatch = useDispatch();
  const navigation= props.navigation;
  let num = 1;
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch({ type: 'REFRESH_HOME', payload: { refresh: num } })
    num++;
    setRefreshing(false);
  }, []);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  })
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Background></Background>
      <Header></Header>
      <Animatable.View 
        animation="fadeInUpBig"
        style={[{color:'black',minHeight:100,backgroundColor:'#f5f5f5',padding:10,marginBottom:15}]}>
            <Text style={{color:'#212121',marginBottom:5,fontSize:16}}>{'DANH MỤC SẢN PHẨM'}</Text>
            <SafeAreaView>{Category({navigation:props.navigation,refreshing:refreshing})}</SafeAreaView>
        </Animatable.View>
      <View>
      <Animatable.View 
        animation="fadeInUpBig"
        style={[{color:'black',minHeight:100,backgroundColor:'#f5f5f5',padding:10,marginBottom:15}]}>
            <Text style={{color:'#212121',marginBottom:5,fontSize:16}}>{'DANH MỤC SẢN PHẨM'}</Text>
            <SafeAreaView><ListBestSeller navigation={props.navigation}></ListBestSeller></SafeAreaView>
        </Animatable.View>
      </View>
      <ComponentsView
        child={ListBrand}
      >
      </ComponentsView>
      <View>
      <Animatable.View 
        animation="fadeInUpBig"
        style={[{color:'black',minHeight:100,backgroundColor:'#f5f5f5',padding:10,marginBottom:15}]}>
            <Text style={{color:'#212121',marginBottom:5,fontSize:16}}>{'TẤT CẢ SẢN PHẨM'}</Text>
            <SafeAreaView><ListAllProduct navigation={props.navigation}></ListAllProduct></SafeAreaView>
        </Animatable.View>
      </View>
    </ScrollView>

  )
}
export default HomeScreen;