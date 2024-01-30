class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.productIdCounter = 1;
  }

  validate(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos son obligatorios.");
    }

    if (this.products.some((product) => product.code === code)) {
      throw new Error("El código del producto ya está en uso.");
    }
  }

  async addProduct(product) {
    try {
      this.validate(
        product.title,
        product.description,
        product.price,
        product.thumbnail,
        product.code,
        product.stock
      );

      const newProduct = {
        id: this.productIdCounter++,
        ...product,
      };

      this.products.push(newProduct);
      await this.writeToFile();
      console.log("Producto agregado correctamente:", newProduct);
    } catch (error) {
      console.error(error.message);
    }
  }

  getProducts() {
    try {
      const fileData = fs.readFileSync(this.path, "utf-8");
      const parsedData = JSON.parse(fileData);
      return parsedData;
    } catch (error) {
      throw error;
    }
  }
  
  async deleteProduct(id) {
    try {
      const index = this.products.findIndex((p) => p.id === id);

      if (index === -1) {
        console.error("Producto no encontrado");
        return;
      }

      const deletedProduct = this.products.splice(index, 1)[0];
      await this.writeToFile();
      console.log("Producto eliminado correctamente:", deletedProduct);
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
    }
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);

    if (!product) {
      console.error("Producto no encontrado");
    }

    return product;
  }
}

const productManager = new ProductManager("./productos.json");

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
