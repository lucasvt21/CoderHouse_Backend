import { Router } from "express"
import productManager from "../../data/fs/ProductManager.js";


const viewsRouter = Router()

viewsRouter.get("/", async (req, res, next) => {
    try {
    const all = await productManager.getProducts()
    return res.render("index", {products: all})
    } catch (error) {
        next(error)
    }
})

viewsRouter.get('/register',()=>{ })
viewsRouter.get('/products',()=>{ })
viewsRouter.get('/new-product',()=>{})
viewsRouter.get('/orders',()=>{})

export default viewsRouter