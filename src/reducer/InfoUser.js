export const InfoReducer= (state={},action)=>{
    switch (action.type) {
     case 'SET_INFO':
         return {...action.data}
     case 'DELETE_INFO':
         return {...state}
     default:
         return {...state}
    }
 }