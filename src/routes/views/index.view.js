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

viewsRouter.get('/register', async( req, res, next) =>{ 
    try {
        res.render("register")
    } catch (error) {
        next(error)
    }
})
viewsRouter.get('/realTimeProducts',async(req, res, next)=>{
    try {
        res.render("realTimeProducts")
    } catch (error) {
        next(error)
    }
 })

export default viewsRouter