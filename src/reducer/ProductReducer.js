function ProductReducer(state='',action){
    switch (action.type) {
        case 'CHANGE_LIST_PRODUCT':
            return action.payload
        default:
            return ''
    }
}
export {ProductReducer}