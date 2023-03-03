import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import  Icon  from "react-native-vector-icons/FontAwesome";
import style from "../style/address";
import { useEffect,useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";
import { connect } from "react-redux";
function AddressButton(props) {
    const navigation =props.navigation;
    const Address =  props.state.AddressReducer;
    const [userInfo,setUserInfo] = useState({});
    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        (async ()=>{
        setUserInfo(JSON.parse(await AsyncStorage.getItem('@userInfo')));
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    })().catch(err=>console.log(err))
    }, [Address?.detailAddress])

    handleChangeAddress=()=>{
        navigation.navigate("AddressScreen",{navigation})
    }
    return <TouchableOpacity style={[style.container, style.containerDC]} onPress={handleChangeAddress}>
        <View style={{flexDirection: 'column', flex: 9.5}}>
            <Text style={style.title}>
                Địa chỉ nhận hàng
            </Text>
            <Text style={style.text}>
            {Address?.address? Address.name:`${userInfo.firstName} ${userInfo.lastName}`} 
            </Text>
            <Text style={style.text}>
            {Address?.address? Address.phone:userInfo.phone}
            </Text>
            <Text style={style.text}>
                {Address?.address? Address.address:userInfo.address}
            </Text >
        </View>
       <Icon name={'angle-right'} size={30} style={{ flex: 0.5, color: '#B9ADAD'}}></Icon>
    </TouchableOpacity>
}
export default connect((state)=>{return {state:state}})(AddressButton)