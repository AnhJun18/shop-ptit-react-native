import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { Slider } from '@miblanchard/react-native-slider';
import { styles, trackMarkStyles, button } from "../style/styleMenu";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
const SliderContainer = (props) => {
    const dispatch = useDispatch();
    const { caption, trackMarks } = props;
    const [value, setValue] = useState([0, 5000000]);
    const [listFilter, setListFilter] = useState([])
    let renderTrackMarkComponent;
    useEffect(() => { }, [listFilter, value])
    if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
        renderTrackMarkComponent = (index) => {
            const currentMarkValue = trackMarks[index];
            const currentSliderValue =
                value || (Array.isArray(value) && value[0]) || 0;
            const style =
                currentMarkValue > Math.max(currentSliderValue)
                    ? trackMarkStyles.activeMark
                    : trackMarkStyles.inactiveMark;
            return <View style={style} />;
        };
    }

    const renderChildren = () => {
        return React.Children.map(
            props.children,
            (child) => {
                if (!!child && child.type === Slider) {
                    return React.cloneElement(child, {
                        onValueChange: setValue,
                        renderTrackMarkComponent,
                        trackMarks,
                        value,
                    });
                }

                return child;
            },
        );
    };

    function createButtonCategory() {
        const [isRefresh, setIsRefresh] = useState(false);
        const [listCategory, setListCategory] = useState(['Áo thun', 'Áo sơ mi', 'Áo mũ trùm', 'Áo mũ trùm', 'Đầm', 'Váy', 'Quần tây', 'Quần què']);
        const [listCategoryObj, setListCategoryObj] = useState(listCategory.map((item) => {
            return {
                name: item,
                isPicked: false
            }
        }))
        useEffect(() => {

        }, [isRefresh])
        return (
            <View style={{ justifyContent: 'space-evenly', alignItems: 'center', top: 10 }}>
                <FlatList
                    data={[...listCategoryObj]}
                    numColumns={2}
                    renderItem={({ item }) => {
                        function setData() {
                            item.isPicked ? setListFilter([...listFilter.filter(element => item.name.toLowerCase() != element)]) : setListFilter([...listFilter, item.name.toLowerCase()]);
                            item.isPicked = !item.isPicked;
                            setIsRefresh(!isRefresh)
                            console.log(listFilter)
                        }
                        return <TouchableOpacity style={item.isPicked ? [button.category, { backgroundColor: '#4ACBD3' }] : button.category} onPress={setData}>
                            <Text style={{ color: 'rgba(0,0,0,0.55)', fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
                        </TouchableOpacity>
                    }
                    }
                /></View>)
    }
    function renderFooter() {
        return (
            <View style={{ height: 600 }}>
                <View style={{ height: 1.5, width: '90%', backgroundColor: 'rgba(0,0,0,0.1)', alignSelf: 'center' }}>
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>Danh mục:</Text>
                    {createButtonCategory()}
                </View>
                <View style={{ bottom: 20, position: 'absolute', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                    <TouchableOpacity
                        onPress={useFilter}
                        style={button.feat}
                    >
                        <Text style={{ fontSize: 17, color: 'rgba(0,0,0,0.4)', fontWeight: '800' }}>Áp dụng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={refreshFilter}
                        style={button.feat}
                    >
                        <Text style={{ fontSize: 17, color: 'rgba(0,0,0,0.4)', fontWeight: '800' }}>Đặt lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.sliderContainer}>
            <View style={styles.titleContainer}>
                <Text>{caption}</Text>
                <Text>{value.length != 0 ? `Từ ${value[0].toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND'
                })} đến ${value[1].toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND'
                })}` : null}</Text>
            </View>
            {renderChildren()}
            {renderFooter()}
        </View>
    );
    function useFilter() {
        dispatch({ type: 'FILTER', payload: { price: [...value], listCategory: [...listFilter] } });
    }
    function refreshFilter() {
        dispatch({ type: 'RESET_FILTER' });
    }
};
function MenuComponent(props) {
    const [refreshFake, setRefreshFake] = useState('')
    useEffect(() => {

    }, [refreshFake])
    return <View style={{ backgroundColor: 'rgba(173, 231, 244, 1)', height: '100%' }}>
        <View style={{ height: 40, padding: 10, backgroundColor: '#1697A9' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Lọc sản phẩm</Text>
        </View>
        <SliderContainer
            caption="Mức giá"
            sliderValue={[0, 5000000]}>
            <Slider
                maximumTrackTintColor="#d3d3d3"
                maximumValue={5000000}
                minimumTrackTintColor="#1fb28a"
                minimumValue={0}
                step={1000}
                thumbTintColor="#1a9274"
            />
        </SliderContainer>
    </View>
}
export default MenuComponent
