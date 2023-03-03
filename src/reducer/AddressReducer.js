export const AddressReducer= (state={},action)=>{
    switch (action.type) {
     case 'SET_ADDRESS':
         return {...action.payload}
     case 'DELETE_ADDRESS':
         return {}
     default:
         return {...state}
    }
 }