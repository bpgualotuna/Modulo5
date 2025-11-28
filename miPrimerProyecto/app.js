const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const puerto = 3001
// Contacto: id, nombre, apellido, telefono

app.use(bodyParser.json());

app.use("/contactos",(request,response,next)=>{
    console.log("Ingresa a funcion de middleware");
    console.log("headers: ", request.headers);
    console.log("body: ",request.body);
    next();
});

app.get("/contactos",(request,response)=>{
    const contactos = [
        {id:1, nombre:"Juan", apellido:"Perez", telefono:"123456789"},
        {id:2, nombre:"Maria", apellido:"Gomez", telefono:"987654321"},
        {id:3, nombre:"Luis", apellido:"Lopez", telefono:"456123789"}
    ];
    
    response.send(contactos);

});

app.post("/contactos",(req,resp)=>{
    req.body.id = 4;
    resp.send(req.body);
});

app.put("/contactos/:idParam",(req,resp)=>{
    const id = req.params.idParam;
    console.log("id a modificar: ", id);
    resp.send(req.body);
});

app.delete("/contactos/:id",(req,resp)=>{
    const id = req.params.id;
    console.log("id a eliminar: ", id);
    resp.send({id:id});
});

app.listen(puerto, ()=>{
    console.log(`Servidor listo en el puerto ${puerto}`);
});




