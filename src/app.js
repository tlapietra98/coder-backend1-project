import express from "express";
import handlebars from "express-handlebars";
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

    res.render("home", { name, styles: "home.css" });
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

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}!`);
});
