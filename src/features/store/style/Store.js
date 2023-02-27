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
    },
    searchBar:{
        alignSelf:'center',
        width:'90%',
        borderColor:'rgba(0,0,0,0.2)',
        borderWidth:0.8,
        justifyContent:'center',
        height:40,
        flexDirection:'row',
        alignItems:'stretch',
        top:10,
        borderRadius:10,
    },
    searchInput:{
        width:'90%',
        alignSelf:'center',
        zIndex:1,
    },
    menu:{
        height:'92.5%',
        width:'80%',
        right:100,
        position:'relative'
    }
})
export default styleStore