const servicio = require('../servicios/productServices')
const Producto = require('../models/productModel');

const getProductos = async (req,res)=>{
    
    const todosLosProductos = await servicio.buscarProductos();
    
    res.status(200).json(todosLosProductos)

}


const getUnProducto = (req,res)=>{
    const id = req.param.id;
    console.log(id);
    res.status(200).json({
        id: req.params.id,
        mensaje: 'traemos un producto'
    })
    res.status(200).send('<h1>te damos uno de los productos</h1>')
}


const productError = (req,res)=>{
    res.status(200).send('<h1>error</h1>')
}


const crearProductos = (req,res)=>{

    const {nombre, precio, stock} = req.body;
    console.log(`${nombre}-${precio}-${stock}`);
    Producto.create(req.body);

    res.status(200).send(`<h1>te creamos todos los productos ${nombre}-${precio}-${stock}</h1>`)
}


const modificarProductos = (Req,res)=>{
    const id = req.param.id;
    console.log(id);
    res.status(200).json({
        id: req.params.id,
        mensaje: 'modificamos un producto'
    })
    res.status(200).send('<h1>te modificamos todos los productos</h1>')
}




const eliminarProductos = (req,res)=>{
    
    res.status(200).send('<h1>te eliminamos todos los productos</h1>')
}
module.exports = {
    getProductos,
    getUnProducto,
    productError,
    crearProductos,
    modificarProductos,
    eliminarProductos
}