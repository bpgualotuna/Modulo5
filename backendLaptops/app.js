const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const puerto = 3001;

const laptops = [
    { id: 1, marca: "Lenovo", procesador: "Intel core i5", memoria: "16GB", disco: "1 TB" },
    { id: 2, marca: "HP", procesador: "Intel core i7", memoria: "8GB", disco: "512 GB" },
    { id: 3, marca: "Dell", procesador: "AMD Ryzen 5", memoria: "16GB", disco: "1 TB" },
    { id: 4, marca: "Apple", procesador: "M1", memoria: "8GB", disco: "256 GB" },


]

app.use(bodyParser.json());

app.use("/laptop", (request, response, next) => {
    console.log("ingresa a middleware de laptop");
    console.log("hedears:", request.headers);
    console.log("body:", request.body);
    next();
})

app.get("/laptop/:idRec", (request, response) => {
    const id = request.params.idRec;
    console.log("id recuperado: " + id);
    for (let i = 0; i < laptops.length; i++) {
        if (laptops[i].id == id) {
            response.send(laptops[i]);
            return;
        }
    }
});

app.get("/laptop", (request, response) => {
    response.send(laptops);
});

app.post("/laptop", (request, response) => {
    request.body.id = 5;
    response.send(request.body);

});

app.put("/laptop/:idParam", (request, response) => {
    const id = request.params.idParam;
    console.log("id recibido:", id);
    response.send(request.body);
});

app.delete("/laptop/:id", (request, response) => {
    const id = request.params.id;
    console.log("id recibido para eliminar:", id);
    response.send({id:id});
});

app.listen(puerto, () => {
    console.log("levantando un servidor en el puerto" + puerto);
});

