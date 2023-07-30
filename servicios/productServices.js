const Producto = require('../models/productModel');

const guardaProducto = (producto)=>{
    Producto.save(producto)
}

const buscarProductos = ()=>{
    const todos = Producto.find({});
    return todos;
}