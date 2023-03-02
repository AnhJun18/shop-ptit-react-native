import { StyleSheet } from "react-native";
const style = StyleSheet.create({
    imageUser: {
        width: 276,
        height: 279,
        marginBottom: 15
    },
    mainLayout: {
        alignItems: 'center',
        bottom:100
    },
    input: {
        width: 300,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
    },
    row:{
        flex:0,
        flexDirection:'row',
    },
    inputWrap:{
        flex:1,
        justifyContent: 'space-between',
    },
    inputName: {
        width: 130,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 32,
        color: 'rgba(131, 122, 122, 1)',
        fontWeight: 'bold'
    },
    textBlue:{
      color:'rgba(48, 80, 251, 1)',
      textDecorationLine: 'underline',
    },
    buttonLogin: {
        marginTop: 15,
        borderWidth: 1,
        width: 200,
        height: 38,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius:20,
    },
    bottom:{
          marginTop:30,
          justifyContent: "center",
          alignItems: 'center',
        
    }
})
export default style;