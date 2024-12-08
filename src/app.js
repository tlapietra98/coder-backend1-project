import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import productsRoutes from "./router/products.routes.js";
import cartsRoutes from "./router/carts.routes.js";
import { ChatManager } from "./managers/chatManager.js";

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

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);

const httpServer = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}!`);
});

// Socket config
const io = new Server(httpServer);

const chatManager = new ChatManager();

io.on("connection", async (socket) => {
    console.log(`A new client (id: ${socket.id}) has connected.`);

    socket.on("newUser", (data) => {
        socket.broadcast.emit("newUser", data);
    });

     socket.on("message", async (data) => {
        await chatManager.saveMessage(data);
        const messageLogs = await chatManager.getMessages()
        io.emit("messageLogs", messageLogs);
    });

});