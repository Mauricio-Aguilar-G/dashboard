//Aqui llamamos todas las dependencias que usaremos en la ruta
const express = require('express');
const Joi = require('joi');
const ruta = express.Router();
const Lugar = require('../models/lugarmodel');


//___________________JOI____________________________

//Esquema de Joi para hacer validacion
const schema = Joi.object({
    lugar:          Joi.string()
                    .min(5)
                    .max(50)
                    .required(),

    horario:        Joi.string()
                    .min(3)
                    .max(30)
                    .required(),
    
    fecha:          Joi.string()
                    .min(3)
                    .max(40)
                    .required(),   
});

//_________________________FIN DE JOI___________________________

//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- Esto es un río

//_______________________________________________________
//____________________________________________________________
//__________________________INICIO DE CRUD________________________
//___________________________________________________________
//______________________________________________________


//-------


//Operaciones del GET (muestra nuestros registros)


//Esta ruta te muestra todos los productos y ya.
ruta.get('/', (req, res) => {
    let resultado = listarLugares();
    resultado
        .then(lugares => {
            res.json(lugares);
        })
        .catch(err => {
            res.status(400).json({
                error:err
            });
        });
});

//Esta ruta nos regresará un lugar con un cierto id
ruta.get('/:id', (req, res) => {
    let resultado = LugarId(req.params.id);
    resultado
        .then(lugar => {
            res.json(lugar);
        })
        .catch(err => {
            res.status(400).json({
                error:err
            });
        });
});


//-------

//Operaciones POST creamos nuevos registros

//Creamos un nuevo lugar a partir del body que recibimos
//al mismo tiempo hacemos una verificacion y si no se manda
//se hace un catch con el error.
ruta.post('/', (req, res )=>{

    
    let body = req.body;                    //Aqui hacemos la validacion con Joi
    const {error, value} = schema.validate({lugar:body.lugar, horario:body.horario, fecha:body.fecha});

    if(!error){
        let resultado = crearLugar(req.body);   //mandamos el body que recibimos
        resultado                               //y se manda a una funcion para crear
            .then (lugar => {                   //el lugar
    
                res.json({
                    valor:lugar
                });   
            })
    
            .catch(err =>{
                res.status(400).json({
                    error:err
                });
            });
            
    }
    else{
        res.status(400).json({
            error:error.message
        })
    }
    
});


//------


//Operaciones DELETE, eliminan nuestros registros o los desactivan

//Esta funcion sirve para eliminar el registro del producto
ruta.delete('/:id', (req, res) => {
    let resultado = borrarLugar(req.params.id);
 
    resultado
             .then(lugar => {
                 res.json({
                     valor:lugar
                 });
             })
             .catch( err => {
                 res.status(400).json({
                     error:err
                 });
             }); 
 });


 
//____________________FIN DE CRUD______________________________________


//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-


//_____________________INICIO DE FUNCIONES____________________________

 //Le damos a cada una de nuestros registros su informacion
 //correspondiente en esta funcion, todo a partir del body
 async function crearLugar(body){
    let lugar = new Lugar({
        lugar: body.lugar,
        horario: body.horario,
        fecha: body.fecha
    });

    return await lugar.save()
}

//Esta funcion sirve para listar todos los productos y ya.
async function listarLugares(){
    let lugares = await Lugar.find();
    return lugares;
}

//Esta funcion la generamos para darle un valor falso al estado de nuestro
//registro de Singer.
async function borrarLugar(id){
    let lugar = await Lugar.findByIdAndDelete(id)
    return lugar;
}

//Funcion para encontrar un lugar con un cierto id
async function LugarId(id){
    let lugar = await Lugar.find({"_id":id});
    return lugar;
}


//_______________________FIN DE FUNCIONES____________________________



module.exports = ruta;
//Exportamos la ruta y finalizamos nuestra ruta para los productos