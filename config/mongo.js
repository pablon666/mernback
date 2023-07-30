require('dotenv').config();

const PORT = process.env.PORT;
const MONGOLOCAL = process.env.MONGOLOCAL;
const MONGOATLAS = process.env.MONGOATLAS;

module.exports = {
    PORT,
    MONGOLOCAL,
    MONGOATLAS
}