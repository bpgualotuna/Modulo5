const IP = "";
const port = 3001;
const URL = "http://" + IP + ":" + port + "/laptop/";

export const getAllLaptops = (fnRefreshList) => {
    console.log("Consultando laptops...");
    fetch(
        "http://192.168.0.110:3001/laptop"
    ).then(
        (response) => { return response.json() }
    ).then(
        (body) => {
            fnRefreshList(body);
        }
    );
}

export const saveLaptopRest = (laptop, fnShowMessage) => {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            marca: laptop.marca,
            procesador: laptop.procesador,
            memoria: laptop.memoria,
            disco: laptop.disco
        })
    }
    fetch(
        "http://192.168.0.110:3001/laptop", config
    ).then((response) => { return response.json() })
        .then((body) => {
            fnShowMessage("Laptop creada con exito");
            console.log("Laptop guardada ", body);
        });
}

export const updateLaptopRest = (laptop, fnShowMessage) => {
    const config = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: laptop.id,
            marca: laptop.marca,
            procesador: laptop.procesador,
            memoria: laptop.memoria,
            disco: laptop.disco
        })
    }
    fetch(
        "http://192.168.0.110:3001/laptop/" + laptop.id, config
    ).then((response) => { return response.json() })
        .then((body) => {
            fnShowMessage("Laptop actualizada con exito");
            console.log("Laptop actualizada ", body);
        });
}

export const deleteLaptopRest = (laptop, fnShowMessage) => {
    const config = {
        method: "DELETE",

    }
    fetch(
        "http://192.168.0.110:3001/laptop/" + laptop.id, config
    ).then((response) => { return response.json() })
        .then((body) => {
            fnShowMessage("Laptop eliminada con exito");
            console.log("Laptop eliminada ", body);
        });
}