import express from "express";
//import productRoutes from "./router/products.routes";

const PORT = 8080

// Inicializamos express y la variable app contendrá todas la funcionalidades de express
const app = express();

// Middleware, para que se interprete la info que llega al servidor
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req,res) => {
    res.status(200).send("Mi primer servidor con Express");
})

app.get("/saludo", (req,res) => {
    res.status(200).send("Hola, te estoy saludando!!!");
})

app.get("/bienvenida", (req,res) => {
    res.status(200).send(`<h1 style="color:blue;">¡Bienvenido a mi primer servidor express!</h1>`);
})

app.get("/usuario", (req,res) => {
    const usuario={
        nombre: "Juan",
        apellido: "Perez",
        edad: 44,
        correo: "jp@gmail.com",
    }
    res.status(200).send(usuario);
})

// req.params

app.get("/parametros/:dato", (req,res)=>{
    const parametro = req.params.dato;

    res.status(200).send(`El dato ingresado por el cliente es: ${parametro}`);
})

app.get("/parametros/:nombre/:apellido", (req,res)=>{
    const nombre = req.params.nombre;
    const apellido = req.params.apellido;

    res.status(200).send(`El nombre completo es ${nombre} ${apellido}`);
})

const usuarios = [
    {id: 1, nombre: "Miguel", apellido: "Castro", edad: 54},
    {id: 2, nombre: "Juan", apellido: "Perez", edad: 33},
    {id: 3, nombre: "Pepe", apellido: "Sapo", edad: 21},
];


app.get("/usuarios/:id", (req,res)=>{
    const { id } = req.params;

    const user = usuarios.find((usuario) => usuario.id === Number(id));
    if(!user) return res.send(`No se encuentra el usuario con el id ${id}`);

    res.status(200).send(user);
});

// req.query

app.get("/queries", (req,res) => {
    const { nombre, apellido } = req.query;
    if(!nombre || !apellido) return res.send("Debe ingresar un nombre y apellido por query!");


    res.status(200).send(`El nombre ingresado es ${nombre} ${apellido}`);
})

const usuarios2 = [
    {id: 1, nombre: "Miguel", apellido: "Castro", edad: 54, genero: "M"},
    {id: 2, nombre: "Juan", apellido: "Perez", edad: 33, genero: "M"},
    {id: 3, nombre: "Pepe", apellido: "Sapo", edad: 21, genero: "M"},
    {id: 4, nombre: "Maria", apellido: "Diaz", edad: 26, genero: "F"},
    {id: 5, nombre: "Emilia", apellido: "Gomez", edad: 36, genero: "F"},
    {id: 6, nombre: "Julia", apellido: "Lopez", edad: 44, genero: "F"},
];

app.get("/usuarios2", (req,res) => {
    
    const { genero } = req.query;
    const query = genero.toLocaleUpperCase();

    if(!genero || ( query !== "M" && query !== "F" )) return res.send(usuarios2);

    const users = usuarios2.filter(usuario => usuario.genero === query);

    res.status(200).send(users);
})


let users = [];

app.get("/user", (req,res)=>{
    res.status(200).send(users);
})

app.get("/user/:id", (req,res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === Number(id));
    if(!user) return res.status(404).send("User not found!");

    res.status(200).send(user);
})

app.post("/user", (req, res) => {

    const user = req.body;

    const newUser = {
        id: users.length + 1,
        ...user,
    }
    users.push(newUser);
    res.status(201).send(users);

})


app.put("/user/:id", (req, res)=>{

    const { id } = req.params;
    const data = req.body;

    const index = users.findIndex(user => user.id === Number(id));
    if(index === -1) return res.status(404).send("User not found!");

    users[index] = {
        ...users[index],
        ...data,
    };

    res.status(200).send(users[index]);

})


app.delete("/user/:id", (req, res) => {
    const { id } = req.params;

    const user = users.find((user) => user.id === Number(id));
    if(!user) return res.status(404).send("User not found!");

    users = users.filter((user) => user.id !== Number(id));

    res.status(200).send("User deleted!!");
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}!!`);
});


