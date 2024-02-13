// carrito.js

import express from 'express';
import fs from 'fs';
import crypto from "crypto"

const cartsRouter = express.Router();

class CartManager {
  constructor(filePath) {
    this.path = filePath;
    this.carts = [];
    this.init();
  }

  init() {
    const fileExists = fs.existsSync(this.path);
    if (fileExists) {
      const fileData = fs.readFileSync(this.path, 'utf-8');
      if (fileData.trim() !== '') {
        this.carts = JSON.parse(fileData);
      }
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }

  async createCart(data) {
    try {
      const { product } = data
      const newCart = {
        id: this.generateUniqueId(),
        product,
      };

      this.carts.push(newCart);
      await this.saveCartsToFile();
      return newCart;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = this.carts.find((c) => c.id === cartId);

      if (!cart) {
        const notFoundError = new Error(`Carrito con ID ${cartId} no encontrado`);
        notFoundError.statusCode = 404;
        throw notFoundError;
      }

      return cart;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
  

  async addProductToCart(cartId, productId) {
    try {
      const cart = await this.getCartById(cartId);
      const existingProductIndex = cart.products.findIndex((p) => p.product === productId);

      if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito, incrementa la cantidad
        cart.products[existingProductIndex].quantity += 1;
      } else {
        // Si el producto no existe, agrégalo al carrito con cantidad 1
        cart.products.push({
          product: productId,
          quantity: 1,
        });
      }

      await this.saveCartsToFile();
      return cart;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
  
  getAllCarts() {
    try {
      return this.carts;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }


  generateUniqueId() {
    // Lógica para generar un ID único (puedes ajustarla según tus necesidades)
    return crypto.randomBytes(8).toString('hex');
  }

  async saveCartsToFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
}


const cartManager = new CartManager('./src/data/files/carrito.json');


export default cartManager;
