class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.error("Todos los campos son obligatorios en llenar");
      return;
    }

    if (
      this.products.some(
        (existingProduct) => existingProduct.code === product.code
      )
    ) {
      console.error("Ya existe un producto con el mismo código");
      return;
    }

    const newProduct = {
      id: this.productIdCounter++,
      ...product,
    };

    this.products.push(newProduct);
    console.log("Producto agregado correctamente:", newProduct);
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
}

const productManager = new ProductManager();

productManager.addProduct({
  title: "Notebook Asus 15.6 FHD I3-1115G4 12GB(4+8) 256SSD X515EA FreeDos",
  description: "Notebook",
  price: 729.990,
  thumbnail: "error",
  code: "P001",
  stock: 15,
});

productManager.addProduct({
  title: "Notebook Lenovo 14 V14 I3-1005G1 8GB 256SSD FreeDos",
  description: "Notebook",
  price: 739.990,
  thumbnail: "error",
  code: "P002",
  stock: 30,
});
productManager.addProduct({
  title: "Notebook HP 15.6 250 G8 I3-1005G1 8GB 256SSD FreeDos",
  description: "Notebook",
  price: 749.990,
  thumbnail: "error",
  code: "P003",
  stock: 11,
});
productManager.addProduct({
  title: "Notebook Asus 15.6 FHD I3-1115G4 12GB(4+8) 256SSD X515EA W11Home",
  description: "Notebook",
  price: 759.990,
  thumbnail: "error",
  code: "P004",
  stock: 10,
});

console.log("Todos los productos:", productManager.getProducts());

const productIdToFind = 2;
const foundProduct = productManager.getProductById(productIdToFind);
console.log(`Producto con ID ${productIdToFind}:`, foundProduct);
