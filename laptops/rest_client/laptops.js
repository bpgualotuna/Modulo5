const IP="";
const port=3001;
const URL="http://"+IP+":"+port+"/laptop/";

export const getAllLaptops=(fnRefreshList)=>{
    console.log("Consultando laptops...");
    fetch(
        "http://10.240.0.162:3001/laptop"
    ).then(
        (response)=>{return response.json()}
    ).then(
        (body)=>{
            fnRefreshList(body);
        }
    );
}