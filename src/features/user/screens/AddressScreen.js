import React, { useEffect, useState } from "react";
import { ActivityIndicator, TextInput,ScrollView, Alert} from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import Background from "../../../common/components/Background";
import MainHeader from "../../../common/components/MainHeader";
import style from "../styles/styleAddress";
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from "react-redux";
function AddressScreen(props) {
    
    const navigation = props.navigation;
    const dispatch =useDispatch()
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [message, setMessage] = useState('');
    const [isActive, setIsActive] = useState(true)
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* <Spinner
                visible={spinner}
                textContent={'Đang tải...'}
                cancelable={true}
                animation={'slide'}
            // customIndicator={()=><ActivityIndicator size={'large'} color="#0000ff"/>}
            /> */}
            <MainHeader title={"Thêm địa chỉ mới"} navigation={navigation} screen={'OrderScreen'}></MainHeader>
            <View style={style.container}>
                <Background></Background>
                <View style={{ alignItems: 'center', height: '70%' }}>
                    <View style={style.inputContainer}>
                        <Text style={style.title}>Liên hệ:</Text>
                        <TextInput style={style.input} placeholder="Họ và tên"
                            onChangeText={text => setName(text)}
                        ></TextInput>
                        <TextInput style={[style.input,isActive?{}:{borderColor:'red',borderWidth:1,borderBottomColor:'red'}]}
                            placeholder="Điện thoại"
                            onChangeText={text => mobileValidate(text)}
                            keyboardType={'numeric'}
                        />
                    </View>

                    <View style={style.inputContainer}>
                        <Text style={style.title}>Địa chỉ:</Text>
                        <Picker
                            style={{ width: 300, height: 'auto' }}
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
                        <TextInput
                            style={style.input}
                            placeholder="Tên đường, tòa nhà, số nhà"
                            onChangeText={text=>setDetailAddress(text)}
                        />
                    </View>
                    <TouchableOpacity style={style.buttonAdd} onPress={handleAddress}>
                        <Text
                            style={{ color: 'black', fontWeight: '600', fontSize: 16, color: '#676161' }}
                        >Thêm mới</Text></TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
        if(isActive){
           dispatch({type:'SET_ADDRESS',payload:{
            name,
            phone,
            address: `${detailAddress}, ${ward}, ${district}, ${province}`
           }})
           console.log()
          navigation.navigate('OrderScreen')
        }
        else{
            Alert.alert('Thông báo',message)
        }
    }
    function mobileValidate(text) {
        const reg = /^[0]\d{9}$/;
        if (reg.test(text) === false) {
            setPhone(text)
            //  setMessage('Số điện thoại không hợp lệ')
            console.log('phone number is not valid')
            setMessage('Số điện thoại không hợp lệ')
            setIsActive(false)
        } else {
            setPhone(text)
            console.log('phone number is valid')
            setIsActive(true)
        }
    }
}
export default AddressScreen;