import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Background from "../../../common/components/Background";
import ListAllProduct from "../../home/components/ListAllProduct";
import styleStore from "../style/Store";
import { TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { Menu } from 'react-native-material-menu';
import MenuComponent from "../components/MenuComponent";
import { RefreshControl } from "react-native";
function StoreScreen(props) {
    const navigation = props.navigation;
    const [visible, setVisible] = useState(true);
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    const hideMenu = () => setVisible(false);
    let num = 1;
   
    return (
        <View style={styleStore.container}
      
        >
            <Menu
                visible={visible}
                onRequestClose={hideMenu}
                style={styleStore.menu}
            >
                <MenuComponent/>
            </Menu>
            <Background />
            <View style={styleStore.searchBar}>
                <Icon name="search" size={25} style={{textAlign:"center", justifyContent: "center",marginTop:5,marginLeft:2,marginRight:2,}}></Icon>
                <TextInput style={styleStore.searchInput} onChangeText={value => {
                    setSearchText(value);
                    dispatch({ type: 'SEARCH', payload: value })
                }} />
            </View>
            <View style={styleStore.navbar}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-around" }}>
                <TouchableOpacity style={styleStore.buttonNav}
                        onPress={() => {
                            setVisible(!visible)
                        }}
                    >
                        <Icon name={'filter'} size={28} style={{ backgroundColor: 'white',marginTop:5 }}></Icon>                        
                    </TouchableOpacity>
                    <TouchableOpacity style={[styleStore.buttonNav,{marginRight:10}]}
                        onPress={() => {
                            setVisible(!visible)
                        }}
                    >
                        <Text numberOfLines={2} style={[styleStore.textButton, { fontWeight: 'bold', fontSize: 20 }]}>Lọc</Text>
                    </TouchableOpacity>
                    <View style={{ width: 1, height: 40, backgroundColor: 'black' }}></View>
                </View>
                <View style={{ flexDirection: 'row', flex: 3, justifyContent: 'space-evenly' }}>
                    <TouchableOpacity style={styleStore.buttonNav}>
                        <Text numberOfLines={2} style={styleStore.textButton}>Tất cả</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleStore.buttonNav}>
                        <Text numberOfLines={2} style={styleStore.textButton}>Sản phẩm bán chạy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleStore.buttonNav}>
                        <Text numberOfLines={2} style={styleStore.textButton}>Sản phẩm mới</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ListAllProduct key={1} screen={'Store'} search={searchText}></ListAllProduct>
        </View>
    )
}
export default StoreScreen