const IP="192.168.0.110";
const port=3001;
const URL="http://"+IP+":"+port+"/";

export const getAllContacts=(fnRefreshList)=>{
    console.log("Consultando contactos...");
    fetch(
        "http://192.168.0.110:3001/contactos"
    ).then(
        (response)=>{return response.json()}
    ).then(
        (body)=>{
            
            fnRefreshList(body);
        }
    )
}