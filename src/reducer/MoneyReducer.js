function MoneyReducer(state={total:0},action){
    switch (action.type) {
        case 'CHANGE_TOTAL_MONEY':
            return {total:action.payload}
        default:
            return {total:0}
    }
}
export {MoneyReducer}