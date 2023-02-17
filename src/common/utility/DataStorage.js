import AsyncStorage from "@react-native-async-storage/async-storage";
async function GetDataStorage(listItem) {
    let listPromise = listItem.map(item => {
        return AsyncStorage.getItem(item)
    })
    return Promise.all(listPromise)
}
async function SetDataStorage(listItem) {
    let listPromise = listItem.map(item => {
        return AsyncStorage.setItem(`${item.key}`, typeof (item.value) === 'object' ? JSON.stringify(item.value) : item.value)
    })
    return Promise.all(listPromise);
}

async function RemoveDataStorage(listItem) {
    let listPromise = listItem.map(item => {
        return AsyncStorage.removeItem(item)
    })
    return Promise.all(listPromise);
}
export default {
    GetDataStorage,
    SetDataStorage,
    RemoveDataStorage
}