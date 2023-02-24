import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { SearchBar } from 'react-native-elements';
import Icon from "react-native-vector-icons/Feather";
import Background from "../../../common/components/Background";
import ListAllProduct from "../../home/components/ListAllProduct";
import { Modal } from "react-native";
import styleStore from "../style/Store";
function StoreScreen(props) {
    const navigation = props.navigation;
    const [button, setButton] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={{ minHeight: '100%' }}>
            <Modal
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
                visible={modalVisible}
                style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
            
            >
                <View style={{ height: 90 }}></View>
            </Modal>
            <Background />
            <SearchBar
                containerStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', height: 70, justifyContent: 'center' }}
                placeholder="Tìm kiếm..."
                platform="ios"
                cancelButtonProps={{ color: 'orange' }}
                searchIcon={{ color: '#7cc4f8' }}
                inputContainerStyle={{ backgroundColor: 'rgb(255,255,255)', height: 40, borderRadius: 0, borderWidth: 0.4, borderBottomColor: 'black' }}
                cancelButtonTitle={'Hủy'}
            />
            <View style={styleStore.navbar}>
                <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Icon name={'filter'} size={35} style={{ backgroundColor: 'white' }}></Icon>
                    <TouchableOpacity style={styleStore.buttonNav}
                        onPress={() => {
                            setModalVisible(!modalVisible)
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
            <ListAllProduct key={1} screen={'Store'} ></ListAllProduct>
        </View>
    )
}
export default StoreScreen