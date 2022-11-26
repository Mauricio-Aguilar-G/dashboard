//Aqui llamamos todas las dependencias que usaremos en la ruta
const express = require('express');
const Joi = require('joi');
const ruta = express.Router();
const Cesta = require('../models/cestamodel');


//___________________JOI____________________________

//Esquema de Joi para hacer validacion
const schema = Joi.object({
    valPedido:      Joi.number()
                    .min(1)
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
    let resultado = listarCestas();
    resultado
        .then(cestas => {
            res.json(cestas);
        })
        .catch(err => {
            res.status(400).json({
                error:err
            });
        });
});


//Esta ruta te muestra todos los productos y ya.
ruta.get('/:id', (req, res) => {
    let resultado = listarCestaId(req.params.id);
    resultado
        .then(cestas => {
            res.json(cestas);
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
    const {error, value} = schema.validate({valPedido:body.valPedido});

    if(!error){
        let resultado = crearCesta(req.body);   //mandamos el body que recibimos
        resultado                               //y se manda a una funcion para crear
            .then (cesta => {                   //la cesta
    
                res.json({
                    valor:cesta
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

//Esta ruta sirve para desactivar el Producto, darle un valor falso a activo. 
ruta.delete('/:id', (req, res) => {
    let resultado = desactivarCesta(req.params.id);
 
    resultado
             .then(cesta => {
                 res.json({
                     valor:cesta
                 });
             })
             .catch( err => {
                 res.status(400).json({
                     error:err
                 });
             }); 
 })



//____________________FIN DE CRUD______________________________________


//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-


//_____________________INICIO DE FUNCIONES____________________________


//Esta funcion sirve para listar todas las cestas y ya.
async function listarCestas(){
    let cestas = await Cesta.find();
    return cestas;
}

//Esta funcion sirve para listar una cesta por id.
async function listarCestaId(id){
    let cesta = await Cesta.findById(id);
    return cesta;
}

 //Le damos a cada una de nuestros registros su informacion
 //correspondiente en esta funcion, todo a partir del body
 async function crearCesta(body){
    let cesta = new Cesta({
        valPedido: body.valPedido
    });

    return await cesta.save()
}


//Esta funcion manda false al estado activo.
async function desactivarCesta(id){
    let cesta = await Cesta.findByIdAndUpdate(id,{
        $set:{
            activo: false
        }
    }, {new: true});
    
    return cesta;

}

//_______________________FIN DE FUNCIONES____________________________



module.exports = ruta;
//Exportamos la ruta y finalizamos nuestra ruta para los productos