import React from "react";
import { Image, View } from "react-native";
import styleHeader from "../style/header";
import SearchView from "../../../common/components/SearchView";
import { SliderBox } from 'react-native-image-slider-box';

function Header() {
    const [images, setImages] = React.useState([
        "https://theme.hstatic.net/200000305259/1000963148/14/slide_index_2.jpg?v=74",
        "https://theme.hstatic.net/200000305259/1000963148/14/slide_index_1.jpg?v=162",
        "https://theme.hstatic.net/200000305259/1000963148/14/slide_index_2.jpg?v=74",
        "https://theme.hstatic.net/200000305259/1000963148/14/slide_index_1.jpg?v=162",
    ]);
    return (
        <View style={{ marginBottom: 0, maxHeight: 190 }}>
            <SliderBox
                images={images}
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={200}
                dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
            />
            {/* <SearchView style={styleHeader.searchView}/> */}
        </View>
    )
}
export default Header