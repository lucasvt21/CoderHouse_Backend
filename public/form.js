const socket = io()

socket.on("welcome", message => {
    console.log(message)
})

const boton = document.querySelector("#boton")

boton.addEventListener("click", (e) => {
    e.preventDefault()
    const newProduct = {}
    newProduct.title = document.querySelector("#title").value
    newProduct.price = document.querySelector("#price").value
    newProduct.stock = document.querySelector("#stock").value,
    newProduct.description = document.querySelector("#description").value,
    newProduct.thumbnail = document.querySelector("#thumbnail").value,
    newProduct.code = document.querySelector("#code").value

    socket.emit("newProduct", newProduct)
})

