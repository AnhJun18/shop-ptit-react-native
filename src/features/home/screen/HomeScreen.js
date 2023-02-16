import React, { useEffect } from "react";
import { Text, TouchableOpacity, View ,Button} from 'react-native';
import axios from "../../../context/axios";
import axiosApiInstance from "../../../context/interceptor";

function HomeScreen(props) {
    
    
    onPressLearnMore= async()=>{
        console.log(axios.defaults.baseURL)
        const result =await axios.get(axios.defaults.baseURL + `/api/product/best-seller`)
        console.log(result)
    }
    return (
        <View>
            <Button title="Home"  onPress={onPressLearnMore}></Button>
        </View>

    )
}
export default HomeScreen;