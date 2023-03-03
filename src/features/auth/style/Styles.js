import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";


const { height } = Dimensions.get("screen")
const height_logo = height * 0.1
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0e8ba9"
    },
    text:{
        color:'#05375a'
    }
    ,
    header: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        paddingBottom:30
    },
    main: {
        flex: 5,
        backgroundColor: "#fff",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    logo: {
        height: height_logo,
        width: height_logo
    },
    txt_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    txt_main: {
        marginTop: 10,
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        alignItems: 'center'
    },
    txt_input: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a'
    },
    button: {
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: "#0e8ba9",
        borderRadius: 5,
        height: 40,
        justifyContent: 'center'
    },
    txt_btn: {
        alignSelf: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    bottom: {
        marginTop: 30,
        justifyContent: "center",
        alignItems: 'center',

    },
    textBlue: {
        color: 'rgba(48, 80, 251, 1)',
        textDecorationLine: 'underline',
    },
    
})
export default styles;