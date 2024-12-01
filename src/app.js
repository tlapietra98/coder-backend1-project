//import express from "express";
//import productRoutes from "./router/products.routes";
import http from "http"


const server = http.createServer( (request, response) => {

    response.end("Hola desde mi servidor Backend!!!");

});

server.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080!")
});

