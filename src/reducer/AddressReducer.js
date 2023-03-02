export const AddressReducer= (state={},action)=>{
    switch (action.type) {
     case 'SET_ADDRESS':
         return {...action.data}
     case 'DELETE_ADDRESS':
         return {}
     default:
         return {...state}
    }
 }