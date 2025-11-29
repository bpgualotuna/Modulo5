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

export const saveContactRest=(contact,fnShowMessage)=>{
    const config={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            nombre:contact.name,
            apellido:contact.surName,
            celular:contact.phoneNumber
        })
    }
    fetch(
        "http://192.168.0.110:3001/contactos",config
    ).then((response)=>{return response.json()})
    .then((body)=>{
        fnShowMessage("Contacto creado con exito");
        console.log("Contacto guardado ", body);
    });
}

export const updateContactRest=(contact,fnShowMessage)=>{
    const config={
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            id:contact.id,
            nombre:contact.name,
            apellido:contact.surName,
            celular:contact.phoneNumber
        })
    }
    fetch(
        "http://192.168.0.110:3001/contactos/"+contact.id,config
    ).then((response)=>{return response.json()})
    .then((body)=>{
        fnShowMessage("Contacto actualizado con exito");
        console.log("Contacto guardado ", body);
    });
}

export const deleteContactRest=(contact,fnShowMessage)=>{
    const config={
        method:"DELETE",
        
    }
    fetch(
        "http://192.168.0.110:3001/contactos/"+contact.id,config
    ).then((response)=>{return response.json()})
    .then((body)=>{
        fnShowMessage("Contacto eliminado con exito");
        console.log("Contacto eliminado ", body);
    });
}