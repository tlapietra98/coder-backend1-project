import fs from "fs";
import { v4 as uuid } from "uuid";

export class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./data/products.json";
  }

  // Get products
  async getProducts(limit) {
    try {
      const file = await fs.promises.readFile(this.path, "utf-8");
      const fileParse = JSON.parse(file);

      this.products = fileParse || [];

      if (!limit) return this.products;

      return this.products.slice(0, limit);
    } catch (error) {
      console.log(error);
    }
  }

  // Add product
  async addProduct(product) {
    try {
      await this.getProducts();

      const { title, description, price, thumbnail, code, stock, category } = product;

      const newProduct = {
        id: uuid(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status: true,
        category,
      };

      // Validate product with same code doesn´t exist
      const productExists = this.products.find((product) => product.code === code);
      if (productExists) throw new Error(`There is already a product with the code ${code}.`);

      // Validate obligatory fields
      const validateProperties = Object.values(newProduct);
      if (validateProperties.includes(undefined)) throw new Error("All fields are required.");

      this.products.push(newProduct);

      await fs.promises.writeFile(this.path, JSON.stringify(this.products));

      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  // Get product
  async getProductById(id) {
    try {
      await this.getProducts();

      const product = this.products.find((product) => product.id === id);
      if (!product) throw new Error(`Product with ID ${id} cannot be found.`);

      return product;
    } catch (error) {
      console.log(error);
    }
  }

  // Update product
  async updateProduct(id, data) {
    try {
      await this.getProductById(id);

      const index = this.products.findIndex((product) => product.id === id);

      this.products[index] = {
        ...this.products[index],
        ...data,
      };

      await fs.promises.writeFile(this.path, JSON.stringify(this.products));

      return this.products[index];
    } catch (error) {
      console.log(error);
    }
  }

  // Delete product
  async deleteProduct(id) {
    try {
      await this.getProductById(id);

      this.products = this.products.filter((products) => products.id !== id);

      await fs.promises.writeFile(this.path, JSON.stringify(this.products));

      return `Product with ID ${id} has been deleted.`;
    } catch (error) {
      console.log(error);
    }
  }
}
