const SearchReducer= (state='',action)=>{
    switch (action.type) {
     case 'SEARCH':
         return action.payload
     default:
         return ''
    }
}
const FilterReducer =(state=[],action)=>{
    switch (action.type) {
        case 'FILTER':
            return [...action.payload]
        default:
            return [0,500000]
       }
}
export {
    SearchReducer,
    FilterReducer
}