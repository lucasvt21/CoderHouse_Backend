import { Router } from 'express';
import cartManager from '../../data/fs/carrito.js';

const cartsRouter = Router();


cartsRouter.post('/', async (req, res, next) => {
  try {
    const data = req.body
    const newCart = await cartManager.createCart(data);
    res.json({ statusCode: 201, response: newCart });
  } catch (error) {
    next(error);
  }
});

cartsRouter.get('/:cid', async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    res.json({ statusCode: 200, response: cart });
  } catch (error) {
    next(error);
  }
});

cartsRouter.post('/:cid/products/:pid', async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.addProductToCart(cid, pid);
    res.json({ statusCode: 200, response: cart });
  } catch (error) {
    next(error);
  }
});

cartsRouter.get('/', async (req, res, next) => {
  try {
    const allCarts = await cartManager.getAllCarts();
    res.json({ statusCode: 200, response: allCarts });
  } catch (error) {
    next(error);
  }
});



export default cartsRouter;
