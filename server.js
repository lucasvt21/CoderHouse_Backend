import express from "express"
import router from "./src/routes/index.router.js"
import errorHandler from "./src/middlewares/errorHandler.js"

const PORT = 8080

const server = express()

const ready = console.log("server ready on port "+ PORT)

server.listen(PORT, ready)
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use("/", router)
server.use(errorHandler)