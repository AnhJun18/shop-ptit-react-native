import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ToastAndroid } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { RadioGroup } from "react-native-radio-buttons-group";
import Background from "../../common/components/Background";
import MainHeader from "../../common/components/MainHeader";
import axiosApiInstance from "../../context/interceptor";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    mainLayout: {
        alignItems: 'center',
    },
    input: {
        width: 300,
        color: '#5A5252',
        borderBottomWidth: 0.7,
        fontSize: 19,
        paddingBottom: 2,
        marginBottom: 15,
    },
    text: {
        fontSize: 20,
        color: '#5A5252',
        fontWeight: 400,
    },
    txtBtn: {
        fontSize: 25,
        fontWeight: 600,
        color: '#676161',
        marginRight: 45,
        marginLeft: 45,
    },
    textBlue: {
        color: '#3050FB',
        textDecorationLine: 'underline',
    },
    btn: {
        height: 50,
        backgroundColor: '#4ACBD3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: 20,
    },
});
function UserInforScreen(props) {
    const [change, setChange] = useState({})
    const userInfo = (props.route.params)

    handleChangeInfo = (title, newValue) => {
        if (title === "name") {
            const name = newValue.split(" ");
            change["firstName"] = name.slice(0, -1).join(" ");
            change["lastName"] = name.slice(-1).join("");
            setChange(change)
        } else {
            change[title] = newValue;
            setChange(change);
        }

    }
    console.log(userInfo)
    const radioGender = [{
        id: "Nam",
        label: "Nam",
        selected: userInfo.userInfo?.gender === "Nam"
    }, {
        id: "Nu",
        label: "Nu",
        selected: userInfo.userInfo?.gender === "Nu"
    }
    ]
    handleSubmit = async () => {
        console.log(change)
        if (Object.keys(change).length) {
            const apiResponse = await axiosApiInstance.put("/api/user/profile", change)
            if (apiResponse.data.status === 200)
                ToastAndroid.show("Thông tin đã được cập nhập", ToastAndroid.BOTTOM);
        }
    }
    return (
        <View style={styles.container}>
            <MainHeader title={"Thông tin cá nhân"} />
            <View style={styles.mainLayout}>
                <KeyboardAvoidingView behavior="">
                    <Text style={styles.text}>Họ và Tên</Text>
                    <TextInput style={styles.input} onChangeText={(value) => { handleChangeInfo("name", value) }}
                    >{userInfo?.userInfo?.firstName + " " + userInfo?.userInfo?.lastName}</TextInput>
                    <Text style={styles.text}>SDT</Text>
                    <TextInput style={styles.input} onChangeText={(value) => { handleChangeInfo("phone", value) }}
                        keyboardType="numeric"  >{userInfo?.userInfo?.phone}</TextInput>
                    <Text style={styles.text}>Giới Tính</Text>
                    <RadioGroup
                        radioButtons={radioGender}
                        onPress={(value) => {
                            handleChangeInfo("gender", value.filter(i => i.selected === true)[0].id)
                        }}
                        layout='row' />
                    <Text style={styles.text}>Email</Text>
                    <TextInput style={styles.input} editable={false}
                    >{userInfo?.userInfo?.account?.email}</TextInput>
                    <Text style={styles.text}>Địa chỉ</Text>
                    <TextInput style={styles.input} onChangeText={(value) => { handleChangeInfo("address", value) }}
                    >{userInfo?.userInfo?.address}</TextInput>
                </KeyboardAvoidingView>
                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                    <Text style={styles.txtBtn}>Cập nhật thông tin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }}>
                    <Text style={styles.textBlue}>Đổi mật khẩu</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default UserInforScreen;