import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import Background from "../../../common/components/Background";
import MainHeader from "../../../common/components/MainHeader";
import style from "../styles/styleAddress";

import { Picker } from '@react-native-picker/picker';

function AddressScreen(props) {
    const navigation = props.navigation;
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWar] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict,setListDistrict] = useState([]);
    const [listWard,setListWard] = useState([]);
    const [dataApi,setDataApi]= useState([])
    useEffect(() => {
        (async () => {
            const data = await (await fetch('https://provinces.open-api.vn/api/?depth=3')).json()
            setDataApi([...data]);
            setListProvince([...data])
        })().then().catch(err=>console.log(err))
    }, [])
    useEffect(()=>{
          
    },[province,district])
    return (
        <View>
            <MainHeader title={"Thêm địa chỉ mới"}></MainHeader>
            <View style={style.container}>
                <Background></Background>
                <View style={{ justifyContent: 'space-evenly', alignItems: 'center', height: '70%' }}>
                    <TextInput style={style.input} placeholder="Họ và tên"></TextInput>
                    <TextInput style={style.input} placeholder="Điện thoại"></TextInput>
                    <Picker
                    
                        style={{ width: 300, height: 100 }}
                        selectedValue={province}
                        onValueChange={(itemValue, itemIndex) =>
                            {
                                setProvince(itemValue);
                                setListDistrict([...dataApi.find(item=>item.name==itemValue).districts])  
                                setListWard([...listDistrict.find(item=>item)?.wards||[]])   
                            }
                            
                        }>
                        {Province()}
                    </Picker>
                    <Picker
                        style={{ width: 300, height: 100 }}
                        selectedValue={district}
                        onValueChange={(itemValue, itemIndex) =>
                            {
                                setDistrict(itemValue);
                                setListWard([...listDistrict.find(item=>item.name==itemValue).wards])      
                            }
                            
                        }>
                        {District()}
                    </Picker>
                    <Picker
                        style={{ width: 300, height: 100 }}
                        selectedValue={ward}
                        onValueChange={(itemValue, itemIndex) =>
                            {
                                setWar(itemValue);    
                            }
                            
                        }>
                        {Ward()}
                    </Picker>
                    <TextInput style={style.input} placeholder="Địa chỉ"></TextInput>
                    
                    <TouchableOpacity style={style.buttonAdd}><Text
                        style={{ color: 'black', fontWeight: '600', fontSize: 16, color: '#676161' }}
                    >Thêm mới</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
    function Province(){
      return  listProvince.length!=0 ?
        (listProvince.map((item,index)=>{
        
            return(
                <Picker.Item label={item.name} value={item.name} key={item.code}/>
            )
        })) : null
    }
    function District(){
        return listDistrict.length!=0 ?
        (listDistrict.map((item,index)=>{
            return(
                <Picker.Item label={item.name} value={item.name} key={item.code}/>
            )
        })) : null
    }
    function Ward(){
        return listWard.length!=0 ?
        (listWard.map((item,index)=>{
            return(
                <Picker.Item label={item.name} value={item.name} key={item.code}/>
            )
        })) : null
    }
    function handleAddress(){
        
    }
}
export default AddressScreen;