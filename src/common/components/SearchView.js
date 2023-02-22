import React from "react";
import { View } from "react-native";
import { SearchBar } from 'react-native-elements';

function SearchView() {
    return (
        <View style={{top:-120}}>
            <SearchBar
                containerStyle={{backgroundColor:'rgba(255,255,255,0)'}}
                placeholder="Tìm kiếm..."
                platform="ios"
                cancelButtonProps={{color:'orange'}}
                searchIcon={{color:'#7cc4f8'}}
                inputContainerStyle={{backgroundColor:'rgb(255,255,255)',height:40,borderRadius:0}}
                cancelButtonTitle={'Hủy'}
            ></SearchBar>
        </View>
    )
}
export default SearchView