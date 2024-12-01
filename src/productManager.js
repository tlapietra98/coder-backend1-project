import fs from "fs";

class ProductManager{

    constructor(){
        this.products = [];
        this.path = "./data/products.json";
    }


    async getProducts() {

        try {
            const file = await fs.promises.readFile(this.path, "utf-8");
            const fileParse = JSON.parse(file);

            this.products = fileParse || [];
            console.log(this.products);
            
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(product)
    {
        try {
            
            await this.getProducts();
            
            const {title, description, price, thumbnail, code, stock} = product;

            const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            };

            const productExists = this.products.find((product) => product.code === code);
            if (productExists) return console.log(`Ya existe un producto con el código ${code}`);

            const validateProperties = Object.values(newProduct);
            if (validateProperties.includes(undefined)) return console.log("Todos los campos son obligatorios!");

            this.products.push(newProduct);

            await fs.promises.writeFile(this.path, JSON.stringify(this.products));

        } catch (error) {
            console.log(error);
        }
    }

}

const products = new ProductManager();

// products.addProduct({
//     title: "Producto 1",
//     description: "Descripción del producto 1",
//     price: 100,
//     thumbnail: "",
//     code: "ABC123",
//     stock: 10,
// });

// products.addProduct({
//     title: "Producto 2",
//     description: "Descripción del producto 2",
//     price: 100,
//     thumbnail: "",
//     code: "ABC124",
//     stock: 10,
// });