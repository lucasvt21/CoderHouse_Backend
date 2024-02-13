import { Router } from "express";
import productsRouter from "./products.router.js";
import cartRouter from "./cart.router.js";

const apiRouter = Router()

apiRouter.use("/products", productsRouter)
apiRouter.use("/carts", cartRouter)

export default apiRouter
