import express from "express"
import routes from "./src/routes/index.router.js"
import errorHandler from "./src/middlewares/errorHandler.js"
import { engine } from 'express-handlebars'
import __dirname from './utils.js'
import { createServer } from "http"
import { Server } from "socket.io"
import productManager from "./src/data/fs/ProductManager.js"

const PORT = 8080

const server = express()

const ready = console.log("server ready on port "+ PORT)
// server.listen(PORT, ready)

const httpServer = createServer(server)
const socketServer = new Server(httpServer)
httpServer.listen(PORT, ready)
socketServer.on("connection", (socket) => {
    console.log(socket.id) 
    socket.on("newProduct", (product) => {
        productManager.addProduct(product)
    })
})

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(express.static(__dirname + "/public"));
server.use("/", routes)
server.use(errorHandler)

