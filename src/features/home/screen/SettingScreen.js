import React, { useEffect } from "react";
import { Text, View } from 'react-native';
import DataStorage from "../../../common/utility/DataStorage";
function SettingScreen(){
    //  useEffect(()=>{
    //     DataStorage.GetDataStorage(['@accessToken','@refreshToken','@userInfo']).then(data=>{
    //         console.log(data)
    //     }).catch(err=>console.log(err))
    //  })
    return (
        <View>
            <Text>Setting</Text>
        </View>
    )
    
}
export default SettingScreen;