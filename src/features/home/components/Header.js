import React from "react";
import { Image, View } from "react-native";
import styleHeader from "../style/header";
import SearchView from "../../../common/components/SearchView";
import { SliderBox } from 'react-native-image-slider-box';

function Header() {
    const [images, setImages] = React.useState([
        "https://theme.hstatic.net/200000305259/1000963148/14/slide_index_2.jpg?v=74",
        "https://theme.hstatic.net/200000305259/1000963148/14/slide_index_1.jpg?v=162",
    ]);
    return (
        <View style={{marginBottom:0,maxHeight:190}}>
            {/* <Image
                style={styleHeader.image}
                source={{ uri: 'https://theme.hstatic.net/200000305259/1000963148/14/slide_index_2.jpg?v=74' }}
            ></Image> */}
            <SliderBox 
                style={styleHeader.image}
                images={images}
                sliderBoxHeight={190}
                dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"  
                onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                paginationBoxVerticalPadding={20}
                autoplay
                circleLoop
            />
            <SearchView style={styleHeader.searchView}/>
        </View>
    )
}
export default Header