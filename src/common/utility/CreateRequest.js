import Const from "../Const";
async function CreateRequest(url,method='GET',body={}){
  console.log(JSON.stringify(body))
   return await (await fetch(`${Const.host}${url}`,createOption(method,body))).json()
}
function createOption(method,body={}){
    return method!='GET'? {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: method,
          body: JSON.stringify(body)
       }: {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: method,
       }
}
export default CreateRequest;