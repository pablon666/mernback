const { PORT } = require('./config/mongo');
const express = require('express');
const app = express();
const { getConnection } = require('./dataBase/conexion');
const { check, validationResult, body, query } = require('express-validator');
const Usuario = require('./models/userModel');
const bcrypt = require('bcrypt'); 
const router = express.Router();
const productRoutes = require('./routes/productRoutes')
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use ('/productos',productRoutes);




getConnection().then((mensaje) => {
    console.log(mensaje);
}).catch((err) => {
    console.log(err);
})


app.listen(PORT, ()=>{
    console.log(`App corriendo en el puerto ${PORT}`);
});

app.get('/',  (req,res)=>{
    console.log(req);
    res.status(200).json({
        mensaje: "todo bien"
    })
});
app.get('/body',  (req,res)=>{
    console.log(req);
    res.status(200).json({
        mensaje: "todo bien"
    })
});



app.post('/body',   

    body('nombre').isLength({min: 3}),
    body('email').isEmail(),
    body('password').isLength({min: 4}),
    
    async (req,res)=>{

    const {nombre, email, password} = req.body;
    
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            errores: errores.array()
        })
    }

    try {
        let usuarioExiste = await Usuario.findOne({email})
        console.log('usuarioExiste');

        if(usuarioExiste){
            return res.status(400).json({
                errores: 'el usuario ya existe'
            })
        }
        const nuevoUsuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        nuevoUsuario.password = bcrypt.hashSync(password,salt);

        await nuevoUsuario.save();

        res.status(200).end( 'usercreado')
    } catch (error){
        console.log(error);
        return res.status(400).json({
            mensaje: 'nuestros mejores dev estan solucionando esto'
        })

    }
}) 
    
app.post('/login', async (req,res)=>{

    [check('email').isLength(),
    check('password').isLength({min:3})]
    const { email, password } = req.body;

    try {
        let usuarioExiste = await Usuario.findOne({email})
        console.log(`existe${usuarioExiste.email}`);

        if(!usuarioExiste){
            return res.status(400).json({
                errores: 'usuario no registrado'
            })
        }
        console.log(usuarioExiste.password);
        
        const validarPassword =  bcrypt.compareSync(password,usuarioExiste.password);

        if(usuarioExiste){
            return res.status(400).json({
                administracion: 'bienvenido amo'
            })
        }
        else{
            return res.status(400).json({
                administracion: 'password incorrecto'
            })
        }
    } catch (error) {
        return res.status(400).json({
            error: 'emailo password incorrecto o render'
        })
    }
}
    


)
app.get('/clientes', async (req, res) => {

    const personas = await Usuario.find({},
        {
            "nombre": 1,
            "apellido": 1,
            "email": 1,
            "timestamp": 1
        });

    console.log(personas);

    res.json({
        personas 
    })

})


app.delete('/clientes/:id', async (req, res) => {

    const id = req.params.id;
    
    console.log(id);
    
    try {
        const deleteUser = await Usuario.findByIdAndDelete(id);
        console.log(deleteUser);
        if(deleteUser){
            console.log('Cliente Eliminado');
            return res.status(200).send();
        }else{
            return res.status(404).send();
        }
    } catch (error) {
        console.log(error);
    }

})


app.put('/clientes/:id', async (req, res) => {

    const id = req.params.id;

    const data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password
    }

    console.log(data);
    console.log(id);
    
    try {
        const updateUser = await Usuario.findByIdAndUpdate(id, data);
        console.log(updateUser);
        if(updateUser){
            console.log('Cliente Actualizado');
            return res.status(200).send();
        }else{
            return res.status(404).send();
        }
    } catch (error) {
        console.log(error);
    }

})