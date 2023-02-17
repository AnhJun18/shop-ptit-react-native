import React from "react";
import { ScrollView } from 'react-native';
import Header from "../components/Header";
import Background from "../../../common/components/Background";
import ComponentsView from "../components/ComponentView";
import Category from "../components/Category";
import ListBestSeller from "../components/ListBestSeller";
import ListAllProduct from "../components/ListAllProduct";
import ListBrand from "../components/ListBrand";
import { useEffect } from "react";
import {LogBox} from 'react-native';
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
                child={ListAllProduct}
                navigation={props.navigation}
            />
        </ScrollView>
    )
}
export default HomeScreen;