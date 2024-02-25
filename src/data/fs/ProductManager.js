import fs from 'fs'
import crypto from "crypto"

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.init();
  }

  init() {
    const fileExists = fs.existsSync(this.path);
    if (fileExists) {
      const fileData = fs.readFileSync(this.path, "utf-8");
      if (fileData.trim() !== "") {
        this.products = JSON.parse(fileData);
      }
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }

  async addProduct(data) {
    try {
      
      const {title, description, price, thumbnail, code, stock} = data

      if(!title || !description || !price || !code || !stock) {
        const error = new Error("hay campos incompletos")
        error.statusCode = 400
        throw error 
      } else {
        const newProduct = {
          id: crypto.randomBytes(12).toString("hex"),
          title,
          description,
          price,
          thumbnail: thumbnail || "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_640.png",
          code,
          stock
        };
        this.products.push(newProduct);
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        return newProduct;
      }
    } catch (error) {
      console.error(error.message);
      throw error
    }
  }

  async getProducts() {
    try {
      const fileData = fs.readFileSync(this.path, "utf-8");
      const parsedData = JSON.parse(fileData);
      if(parsedData.length === 0) {
        const error = new Error("No hay productos")
        error.statusCode = 404
        throw error
      } else {
        return parsedData
      }
    } catch (error) {
      throw error;
    }
  }
  
  async deleteProduct(id) {
    try {
      const index = this.products.findIndex(x => x.id === id);
      if (index === -1) {
          const notIdError = new Error("El id del producto no fue encontrado " + id);
          notIdError.statusCode = 400
          throw notIdError
      } else {
          this.products.splice(index, 1);
          const jsonData = JSON.stringify(this.products, null, 2);
          await fs.promises.writeFile(this.path, jsonData);
          return id;
      }
  } catch (error) {
      console.error(error.message);
      throw error
  }
  }

  async getProductById(id) {
    try {
        const fileData = fs.readFileSync(this.path, "utf-8");
        const parsedData = JSON.parse(fileData);
        const one = parsedData.find(x => x.id === id);
        if (one) {
            return one;
        } else {
            const error = new Error(`Producto con ID ${id} no encontrado`);
            error.statusCode = 400;
            throw error;
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
async updateProduct(id, updatedData) {
  try {
    const index = this.products.findIndex((x) => x.id === id);
    if (index === -1) {
      const notFoundError = new Error(`El producto con ID ${id} no fue encontrado`);
      notFoundError.statusCode = 404;
      throw notFoundError;
    }
    updatedData.id = id;
    this.products[index] = { ...this.products[index], ...updatedData };
    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    return this.products[index];
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

}

const productManager = new ProductManager("./src/data/files/productos.json");

export default productManager

// Agregar productos
// productManager.addProduct({
//   title: "Notebook Asus 15.6 FHD I3-1115G4 12GB(4+8) 256SSD X515EA FreeDos",
//   description: "Notebook",
//   price: 729.990,
//   thumbnail: "error",
//   code: "P001",
//   stock: 15,
// });

// productManager.addProduct({
//   title: "Notebook Lenovo 14 V14 I3-1005G1 8GB 256SSD FreeDos",
//   description: "Notebook",
//   price: 739.990,
//   thumbnail: "error",
//   code: "P002",
//   stock: 30,
// });

// productManager.addProduct({
//   title: "Notebook HP 15.6 250 G8 I3-1005G1 8GB 256SSD FreeDos",
//   description: "Notebook",
//   price: 749.990,
//   thumbnail: "error",
//   code: "P003",
//   stock: 11,
// });

// productManager.addProduct({
//   title: "Notebook Asus 15.6 FHD I3-1115G4 12GB(4+8) 256SSD X515EA W11Home",
//   description: "Notebook",
//   price: 759.990,
//   thumbnail: "error",
//   code: "P004",
//   stock: 10,
// });
