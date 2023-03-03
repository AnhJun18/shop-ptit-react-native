import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import { FlatList } from 'react-native'
function Category() {
    const data = [{ name: 't-shirt', img: 'https://theme.hstatic.net/200000305259/1000967293/14/banner_index_1.jpg?v=12' },
    { name: 'shirt', img: 'https://theme.hstatic.net/200000305259/1000967293/14/banner_index_2.jpg?v=12' },
    { name: 'sweater', img: 'https://theme.hstatic.net/200000305259/1000967293/14/banner_index_3.jpg?v=12' },
    { name: 'short', img: 'https://theme.hstatic.net/200000305259/1000967293/14/banner_index_4.jpg?v=12' },
    { name: 'hoodie', img: 'https://theme.hstatic.net/200000305259/1000967293/14/banner_index_5.jpg?v=12' }
    ]
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <View
                        key={index}
                        style={{
                            flex: 0,
                            flexDirection: 'column',
                            marginBottom:10,
                            marginRight:10,
                        }}>

                        <Image
                            style={{ height: 64, width: 117 ,
                            alignItems: 'center'}}
                            source={{ uri: item.img }}
                        />
                    </View>
                )}
                //Setting the number of column
                numColumns={3}
            />
        </SafeAreaView>
    )
}
export default Category;