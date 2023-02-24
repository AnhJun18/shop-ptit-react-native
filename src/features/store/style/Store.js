import { StyleSheet } from "react-native";
const styleStore = StyleSheet.create({
    container: {

    },
    navbar: {
        display: 'flex',
        height: 60,
        flexDirection: 'row',
        marginVertical:10,
        paddingHorizontal:10,
        backgroundColor:'rgba(255,255,255,1)',
        justifyContent:"center",
        alignItems:"center",
        marginBottom:10
    }
    ,
    buttonNav: {
        maxHeight: 70,
        maxWidth: 70,
        alignSelf:'center'
    },
    textButton: {
        textAlign: 'center',
        fontSize:14
    }
})
export default styleStore