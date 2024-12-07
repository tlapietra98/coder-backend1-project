import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import productsRoutes from "./router/products.routes.js";
import cartsRoutes from "./router/carts.routes.js";

const PORT = 8080;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// Handlebars config
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");


app.get("/", (req, res) => {
    const { name } = req.query;

    res.render("index", { name, styles: "index.css" });
});

app.get("/users", (req, res) => {
    let users = [
        {
            name: "Tomi",
            lastName: "La Pietra",
        },
        {
            name: "Juan",
            lastName: "Perez",
        },
        {
            name: "Pedro",
            lastName: "Sanchez",
        },
        {
            name: "Ana",
            lastName: "Diaz",
        },
    ];

    res.render("users", { users });
});

app.get("/admin", (req, res) => {
    let user = {
        name: "Tomi",
        lastName: "La Pietra",
        isAdmin: false,
    }
    res.render("admin", user);
})


app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);

const httpServer = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}!`);
});

// Socket config
const io = new Server(httpServer);

let products = [];

let messages = [];

io.on("connection", (socket) => {
    console.log(`A new client (id: ${socket.id}) has connected.`);

    socket.on("product", (data) => {
        products.push(data);

        // Send updated products info to all clients
        io.emit("products", products);

        // Update stock
        socket.on("changeStock", (data) => {
            products = data;
            io.emit("products", products);
        });
    });

    socket.on("newUser", (data) => {
        socket.broadcast.emit("newUser", data);
    });

    socket.on("message", (data) => {
        messages.push(data);
        io.emit("messageLogs", messages);
    });

});