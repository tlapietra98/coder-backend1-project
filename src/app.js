import express from "express";
import productsRoutes from "./router/products.routes.js";
import cartsRoutes from "./router/carts.routes.js";

const PORT = 8080
const app = express();

// Middleware, para que se interprete la info que llega al servidor
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);

app.listen(PORT, () => {
    console.log(`Servidor on port ${PORT}!`);
});
