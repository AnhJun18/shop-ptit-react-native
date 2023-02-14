import {host} from "../Const";
async function CreateRequest(url,method='GET',body={}){
   return await (await fetch(`host${url}`,createOption(method,body))).json()
}
function createOption(method,body={}){
    return method!='GET'? {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: method,
          body: body
       }: {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: method,
       }
}
export default CreateRequest;