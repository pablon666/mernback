const mongoose = require('mongoose');
const { MONGOLOCAL, MONGOATLAS } = require('../config/mongo');

const getConnection = async () =>{
    try {
        await mongoose.connect(MONGOATLAS);
        return 'Conexion a la base de datos exitosa'
    } catch (error) {
        console.log(error);
        throw new Error('Error:' + error.message);
    }
}

module.exports = {getConnection};
