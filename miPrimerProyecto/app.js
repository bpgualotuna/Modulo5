const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const puerto = 3001


app.use(bodyParser.json());

app.use("/contactos", (request, response, next) => {
    console.log("Ingresa a funcion de middleware");
    console.log("headers: ", request.headers);
    console.log("body: ", request.body);
    next();
});

const { Client } = require("pg");



app.get("/contactos", (request, response) => {
    const contactos = [
        { id: 1, nombre: "Juan", apellido: "Perez", telefono: "123456789" },
        { id: 2, nombre: "Maria", apellido: "Gomez", telefono: "987654321" },
        { id: 3, nombre: "Luis", apellido: "Lopez", telefono: "456123789" }
    ];
    const client = new Client({
        user: "postgres",
        host: "192.168.0.110",
        database: "postgres",
        password: "bpg2000",
        port: 5432,
    });

    client.connect();

    client.query("select * from contactos").then(responseQuery => {
        console.log(responseQuery.rows);
        response.send(responseQuery.rows);
        client.end();
    }).catch(err => {
        console.log(err);
        client.end();
    })


});

app.post("/contactos", (req, resp) => {
    
    const client = new Client({
        user: "postgres",
        host: "192.168.0.110",
        database: "postgres",
        password: "bpg2000",
        port: 5432,
    });

    client.connect();

    client.query("insert into contactos (nombre,apellido,celular) values ($1,$2,$3)",
        [req.body.nombre, req.body.apellido, req.body.celular]).then(responseQuery => {
            console.log(responseQuery.rows);
            resp.send(responseQuery.rows);
            client.end();
        }).catch(err => {
            console.log(err);
            client.end();
        })
});

app.put("/contactos/:idParam", (req, resp) => {
    const id = req.params.idParam;
    console.log("id a modificar: ", id);
    resp.send(req.body);
    const client = new Client({
        user: "postgres",
        host: "192.168.0.110",
        database: "postgres",
        password: "bpg2000",
        port: 5432,
    });

    client.connect();

    client.query("update contactos set nombre = $1, apellido = $2, celular = $3 where id_c = $4",
        [req.body.nombre, req.body.apellido, req.body.celular, id]).then(responseQuery => {
            console.log(responseQuery.rows);
            client.end();
        }).catch(err => {
            console.log(err);
            client.end();
        })
});

app.delete("/contactos/:id", (req, resp) => {
    const id = req.params.id;
    console.log("id a eliminar: ", id);
    resp.send({ id: id });
    const client = new Client({
        user: "postgres",
        host: "192.168.0.110",
        database: "postgres",
        password: "bpg2000",
        port: 5432,
    });

    client.connect();

    client.query("delete from contactos where id_c = $1", [id]).then(responseQuery => {
        console.log(responseQuery.rows);
        client.end();
    }).catch(err => {
        console.log(err);
        client.end();
    })
});

app.listen(puerto, () => {
    console.log(`Servidor listo en el puerto ${puerto}`);
});



