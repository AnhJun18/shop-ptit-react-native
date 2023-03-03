function RefreshHome(state={},action){
    switch (action.type) {
        case 'REFRESH_HOME':
            return {...action.payload}
        default:
            return {}
    }
}
function RefreshStore(state={},action){
    switch (action.type) {
        case 'REFRESH_STORE':
            return {...action.payload}
        default:
            return {}
    }
}
export {RefreshHome,RefreshStore}