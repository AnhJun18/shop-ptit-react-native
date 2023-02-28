const SearchReducer = (state = '', action) => {
    switch (action.type) {
        case 'SEARCH':
            return action.payload
        default:
            return ''
    }
}
const FilterReducer = (state = { price: [0, 5000000], listCategory: [] }, action) => {
    switch (action.type) {
        case 'FILTER':
            return {
                price: [...action.payload.price],
                listCategory: [...action.payload.listCategory]
            }
        case 'RESET_FILTER':
            return { price: [0, 5000000], listCategory: [] }
        default:
            return {price: [0, 5000000], listCategory: [] }
    }

}
const CategoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CATEGORY':
            return [...action.payload]
        default:
            return []
    }
}

export {
    SearchReducer,
    FilterReducer,
    CategoryReducer
}