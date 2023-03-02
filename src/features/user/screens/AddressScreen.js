import React, { useEffect, useState } from "react";
import { ActivityIndicator, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import Background from "../../../common/components/Background";
import MainHeader from "../../../common/components/MainHeader";
import style from "../styles/styleAddress";
import { Picker } from '@react-native-picker/picker';
import Spinner from 'react-native-loading-spinner-overlay';
import styleLoading from '../../../common/components/styleLoading'
function AddressScreen(props) {
    const navigation = props.navigation;
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWar] = useState('');
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listWard, setListWard] = useState([]);
    const [dataApi, setDataApi] = useState([]);
    const [spinner, setSprinner] = useState(true)
    useEffect(() => {
        (async () => {
            const data = await (await fetch('https://provinces.open-api.vn/api/?depth=3')).json()
            setDataApi([...data]);
            setListProvince([...data])
        })().then().catch(err => console.log(err)).finally(() => setSprinner(!spinner))
    }, [])
    useEffect(() => {
    }, [province, district])
    return (
        <View>
            <Spinner
                visible={spinner}
                textContent={'Đang tải...'}
                cancelable={true}
                animation={'slide'}
            // customIndicator={()=><ActivityIndicator size={'large'} color="#0000ff"/>}
            />
            <MainHeader title={"Thêm địa chỉ mới"}></MainHeader>
            <View style={style.container}>
                <Background></Background>
                <View style={{ alignItems: 'center', height: '70%' }}>
                    <View style={style.inputContainer}>
                        <Text style={style.title}>Liên hệ:</Text>
                        <TextInput style={style.input} placeholder="Họ và tên"></TextInput>
                        <TextInput style={style.input} placeholder="Điện thoại"></TextInput>
                    </View>
                    
                    <View style={style.inputContainer}>
                        <Text style={style.title}>Địa chỉ:</Text>
                        <Picker
                            style={{ width: 300, height: 'auto'}}
                            selectedValue={province}
                            onValueChange={(itemValue, itemIndex) => {
                                setProvince(itemValue);
                                setListDistrict([...dataApi.find(item => item.name == itemValue).districts])
                                setListWard([...listDistrict.find(item => item)?.wards || []])
                            }

                            }>
                            {Province()}
                        </Picker>
                        <Picker
                            style={{ width: 300, height: 'auto' }}
                            selectedValue={district}
                            onValueChange={(itemValue, itemIndex) => {
                                setDistrict(itemValue);
                                setListWard([...listDistrict.find(item => item.name == itemValue).wards])
                            }

                            }>
                            {District()}
                        </Picker>
                        <Picker
                            style={{ width: 300, height: 'auto' }}
                            selectedValue={ward}
                            onValueChange={(itemValue, itemIndex) => {
                                setWar(itemValue);
                            }
                            }>
                            {Ward()}
                        </Picker>
                        <TextInput style={style.input} placeholder="Tên đường, tòa nhà, số nhà"></TextInput>
                    </View>
                    

                    <TouchableOpacity style={style.buttonAdd}><Text
                        style={{ color: 'black', fontWeight: '600', fontSize: 16, color: '#676161' }}
                    >Thêm mới</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
    function Province() {
        return listProvince.length != 0 ?
            (listProvince.map((item, index) => {

                return (
                    <Picker.Item label={item.name} value={item.name} key={item.code} />
                )
            })) : null
    }
    function District() {
        return listDistrict.length != 0 ?
            (listDistrict.map((item, index) => {
                return (
                    <Picker.Item label={item.name} value={item.name} key={item.code} />
                )
            })) : null
    }
    function Ward() {
        return listWard.length != 0 ?
            (listWard.map((item, index) => {
                return (
                    <Picker.Item label={item.name} value={item.name} key={item.code} />
                )
            })) : null
    }
    function handleAddress() {

    }
}
export default AddressScreen;