export const SearchReducer= (state=false,action)=>{
    switch (action.type) {
     case 'SEARCH':
         return action.payload
     default:
         return ''
    }
 }