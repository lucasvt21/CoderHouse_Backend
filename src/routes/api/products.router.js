import { Router } from "express";
import productManager from "../../data/fs/ProductManager.js";

const productsRouter = Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const one = await productManager.addProduct(data);
    return res.json({
      statusCode: 201,
      response: one,
    });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const response = await productManager.getProducts();
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await productManager.getProductById(pid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
try {
    const {pid} = req.params
    const response = await productManager.deleteProduct(pid);
    return res.json({
    statusCode: 200,
    response,
    });
} catch (error) {
    next(error);
}
});

productsRouter.put("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const updatedFields = req.body;
    const existingProduct = await productManager.getProductById(pid);
    const updatedProduct = { ...existingProduct, ...updatedFields };
    const response = await productManager.updateProduct(pid, updatedProduct);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    next(error);
  }
});


export default productsRouter;
