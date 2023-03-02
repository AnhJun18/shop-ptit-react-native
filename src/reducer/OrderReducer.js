function OrderReducer(state=[],action){
 switch (action.type) {
    case 'SET_ORDER':
        return  [...action.payload]
    case 'DELETE_ORDER':
        return []
    default:
        return [...state]
 }
}
export default OrderReducer