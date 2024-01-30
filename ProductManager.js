const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.productIdCounter = 1;

    this.loadProductsFromFile();
  }

  validate(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos son obligatorios.");
    }

    if (this.products.some(product => product.code === code)) {
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

  async deleteProduct(id) {
    try {
      const fileData = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(fileData) || [];

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

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);

    if (!product) {
      console.error("Producto no encontrado");
    }

    return product;
  }

  async writeToFile() {
    const data = JSON.stringify(this.products, null, 2);
    await fs.promises.writeFile(this.path, data, 'utf-8');
  }

  async loadProductsFromFile() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data) || [];
      this.productIdCounter = Math.max(...this.products.map(p => p.id), 0) + 1;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return;
      }
      console.error("Error al cargar productos desde el archivo:", error.message);
    }
  }
}

const jsonFilePath = 'productos.json';

const productManager = new ProductManager(jsonFilePath);

const productIdToDelete = 2;
productManager.deleteProduct(productIdToDelete);

console.log("Todos los productos:", productManager.getProducts());
