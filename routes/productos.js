//Aqui llamamos todas las dependencias que usaremos en la ruta
const express = require('express');
const Joi = require('joi');
const ruta = express.Router();
const Producto = require('../models/productomodel');

//___________________JOI____________________________

//Esquema de Joi para hacer validacion
const schema = Joi.object({
    src:            Joi.string()
                    .min(5)
                    .max(45)
                    .required(),

    title:          Joi.string()
                    .min(3)
                    .max(30)
                    .required(),
    
    size:           Joi.string()
                    .min(3)
                    .max(20)
                    .required(),   

    price:          Joi.number()
                    .required(),
});

//Esquema de Joi para hacer validacion para src independiente
const schemaSrc = Joi.object({
    src:            Joi.string()
                    .min(10)
                    .max(45)
                    .required(),
});
    

//Esquema de Joi para hacer validacion para title independiente
const schemaTtl = Joi.object({
    title:           Joi.string()
                    .min(3)
                    .max(30)
                    .required(),
});

//Esquema de Joi para hacer validacion para precio independiente
const schemaPrc = Joi.object({
    price:          Joi.number()
                    .required(),
});

//Esquema de Joi para hacer validacion para title independiente
const schemaSz = Joi.object({
    size:           Joi.string()
                    .min(3)
                    .max(20)
                    .required(),
});
//_________________________FIN DE JOI___________________________



//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- Esto es un río

//_______________________________________________________
//____________________________________________________________
//__________________________INICIO DE CRUD________________________
//___________________________________________________________
//______________________________________________________


//Operaciones del GET (muestra nuestros registros)

//Esta ruta te muestra todos los productos que esten activos.
ruta.get('/', (req, res) => {
    let resultado = listarProductosActivos();
    resultado
        .then(productos => {
            res.json(productos);
        })
        .catch(err => {
            res.status(400).json({
                error:err
            });
        });
});


//Esta ruta te muestra todos los productos y ya.
ruta.get('/todos', (req, res) => {
    let resultado = listarProductos();
    resultado
        .then(productos => {
            res.json(productos);
        })
        .catch(err => {
            res.status(400).json({
                error:err
            });
        });
});

//Esta ruta muestra un producto con cierto id  
ruta.get('/:id', (req, res) => {
    let resultado = productoId(req.params.id);
    resultado
        .then(producto => {
            res.json(producto);
        })
        .catch(err => {
            res.status(400).json({
                error:err
            });
        });
});


//Operaciones POST creamos nuevos registros

//Creamos un nuevo producto a partir del body que recibimos
//al mismo tiempo hacemos una verificacion y si no se manda
//se hace un catch con el error.
ruta.post('/', (req, res )=>{

    
    let body = req.body;                    //Aqui hacemos la validacion con Joi
    const {error, value} = schema.validate({src: body.src, title:body.title, size:body.size, price:body.price});

    if(!error){
        let resultado = crearProducto(req.body);   //mandamos el body que recibimos
        resultado                               //y se manda a una funcion para crear
            .then (producto => {                   //el producto
    
                res.json({
                    valor:producto
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

//Operaciones DELETE, eliminan nuestros registros o los desactivan

//Esta funcion sirve para eliminar el registro del producto
ruta.delete('/:id', (req, res) => {
    let resultado = borrarProducto(req.params.id);
 
    resultado
             .then(producto => {
                 res.json({
                     valor:producto
                 });
             })
             .catch( err => {
                 res.status(400).json({
                     error:err
                 });
             }); 
 });


//Esta ruta sirve para desactivar el Producto, darle un valor falso a activo. 
ruta.delete('/des/:id', (req, res) => {
    let resultado = desactivarProducto(req.params.id);
 
    resultado
             .then(producto => {
                 res.json({
                     valor:producto
                 });
             })
             .catch( err => {
                 res.status(400).json({
                     error:err
                 });
             }); 
 })


//Operaciones PUT, modifican o activan nuestros registros.

//Esta ruta sirve para activar el Producto, darle un valor falso a activo. 
ruta.put('/act/:id', (req, res) => {
    let resultado = activarProducto(req.params.id);
 
    resultado
             .then(producto => {
                 res.json({
                     valor:producto
                 });
             })
             .catch( err => {
                 res.status(400).json({
                     error:err
                 });
             }); 
 })


 //Esta ruta sirve para modificar la src de la imagen del Producto.
ruta.put('/src/:id', (req, res) => {

    let body = req.body;                    //Aqui hacemos la validacion con Joi
    const {error, value} = schemaSrc.validate({src: body.src});

    if(!error){
        let resultado = srcProducto(req.params.id, req.body);
    
        resultado
                .then(producto => {
                    res.json({
                        valor:producto
                    });
                })
                .catch( err => {
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
 })

  //Esta ruta sirve para modificar el titulo del Producto.
ruta.put('/ttl/:id', (req, res) => {

    let body = req.body;                    //Aqui hacemos la validacion con Joi
    const {error, value} = schemaTtl.validate({title: body.title});

    if(!error){
        let resultado = ttlProducto(req.params.id, req.body);
    
        resultado
                .then(producto => {
                    res.json({
                        valor:producto
                    });
                })
                .catch( err => {
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
 })

   //Esta ruta sirve para modificar el size del Producto.
ruta.put('/sz/:id', (req, res) => {

    let body = req.body;                    //Aqui hacemos la validacion con Joi
    const {error, value} = schemaSz.validate({size: body.size});

    if(!error){
        let resultado = szProducto(req.params.id, req.body);
    
        resultado
                .then(producto => {
                    res.json({
                        valor:producto
                    });
                })
                .catch( err => {
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
 })


    //Esta ruta sirve para modificar el size del Producto.
ruta.put('/prc/:id', (req, res) => {

    let body = req.body;                    //Aqui hacemos la validacion con Joi
    const {error, value} = schemaPrc.validate({price: body.price});

    if(!error){
        let resultado = prcProducto(req.params.id, req.body);
    
        resultado
                .then(producto => {
                    res.json({
                        valor:producto
                    });
                })
                .catch( err => {
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
 })


//____________________FIN DE CRUD______________________________________


//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-


//_____________________INICIO DE FUNCIONES____________________________

//Esta funcion te muestra todos los productos activos
async function listarProductosActivos(){
    let productos = await Producto.find({"activo":true});
    return productos;
}

//Esta funcion sirve para listar todos los productos y ya.
async function listarProductos(){
    let productos = await Producto.find();
    return productos;
}

//Esta funcion te muestra un producto con cierto id
async function productoId(id){
    let producto = await Producto.find({"_id":id});
    return producto;
}


 //Le damos a cada una de nuestros registros su informacion
 //correspondiente en esta funcion, todo a partir del body
async function crearProducto(body){
    let producto = new Producto({
        src: body.src,
        title: body.title,
        size: body.size,
        price: body.price
    });

    return await producto.save()
}


//Esta funcion la generamos para darle un valor falso al estado de nuestro
//registro de Singer.
async function borrarProducto(id){
    let producto = await Producto.findByIdAndDelete(id)
    return producto;
}

//Esta funcion manda false al estado activo.
async function desactivarProducto(id){
    let producto = await Producto.findByIdAndUpdate(id,{
        $set:{
            activo: false
        }
    }, {new: true});
    
    return producto;

}

//Esta funcion manda false al estado activo.
async function activarProducto(id){
    let producto = await Producto.findByIdAndUpdate(id,{
        $set:{
            activo: true
        }
    }, {new: true});
    
    return producto;

}

//Esta funcion manda false al estado activo.
async function srcProducto(id, body){
    let producto = await Producto.findByIdAndUpdate(id,{
        $set:{
            src: body.src
        }
    }, {new: true});
    
    return producto;

}

//Esta funcion manda false al estado activo.
async function ttlProducto(id, body){
    let producto = await Producto.findByIdAndUpdate(id,{
        $set:{
            title: body.title
        }
    }, {new: true});
    
    return producto;

}

//Esta funcion manda false al estado activo.
async function prcProducto(id, body){
    let producto = await Producto.findByIdAndUpdate(id,{
        $set:{
            price: body.price
        }
    }, {new: true});
    
    return producto;

}

//Esta funcion manda false al estado activo.
async function szProducto(id, body){
    let producto = await Producto.findByIdAndUpdate(id,{
        $set:{
            size: body.size
        }
    }, {new: true});
    
    return producto;

}

//_______________________FIN DE FUNCIONES____________________________

module.exports = ruta;
//Exportamos la ruta y finalizamos nuestra ruta para los productos