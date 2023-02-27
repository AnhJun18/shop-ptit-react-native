import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import {Slider} from '@miblanchard/react-native-slider';
import { styles,trackMarkStyles} from "../style/styleMenu";

const CustomThumb = () => (
    <View style={componentThumbStyles.container}>
        <Text>Any</Text>
    </View>
);
const SliderContainer = (props) => {
    const dispatch = useDispatch()
    const {caption, sliderValue, trackMarks} = props;
    const [value, setValue] = React.useState(
        sliderValue ? sliderValue : [0,5000000]
    );
    let renderTrackMarkComponent;

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
        dispatch({type:'FILTER',payload:[...value]})
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

    return (
        <View style={styles.sliderContainer}>
            <View style={styles.titleContainer}>
                <Text>{caption}</Text>
                <Text>{Array.isArray(value) ? `Từ ${value[0].toLocaleString('vi', {
                                style: 'currency',
                                currency: 'VND'
                            })} đến ${value[1].toLocaleString('vi', {
                                style: 'currency',
                                currency: 'VND'
                            })}`: value}</Text>
            </View>
            {renderChildren()}
        </View>
    );
};
const renderAboveThumbComponent = () => {
    return <View style={aboveThumbStyles.container} />;
};


function MenuComponent(props) {
    return <View>
        <Text>Lọc sản phẩm</Text>
        <Text>Giá</Text>
        <SliderContainer
                caption="Mức giá"
                sliderValue={[0, 5000000]}>
                <Slider
                    animateTransitions
                    maximumTrackTintColor="#d3d3d3"
                    maximumValue={5000000}
                    minimumTrackTintColor="#1fb28a"
                    minimumValue={0}
                    step={50000}
                    thumbTintColor="#1a9274"
                />
            </SliderContainer>
    </View>
}
export default MenuComponent