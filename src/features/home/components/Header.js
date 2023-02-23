import React from "react";
import { Image, View } from "react-native";
import styleHeader from "../style/header";
import SearchView from "../../../common/components/SearchView";
function Header() {
    return (
        <View style={{marginBottom:0,maxHeight:190}}>
            <Image
                style={styleHeader.image}
                source={{ uri: 'https://theme.hstatic.net/200000305259/1000963148/14/slide_index_2.jpg?v=74' }}
            ></Image>
            <SearchView style={styleHeader.searchView}/>
        </View>
    )
}
export default Header