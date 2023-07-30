const express = require('express');
const router = express.Router();


const {
    getProductos,
    getUnProducto,
    productError,
    crearProductos,
    modificarProductos,
    eliminarProductos
} = require('../controllers/productControllers')
router.get('/', getProductos);
router.get('/prod/:id', getUnProducto)
router.get('/error', productError);
router.post('/', crearProductos)
router.post('/update/:id', modificarProductos)
router.post('/delete/',eliminarProductos)



    module.exports = router;