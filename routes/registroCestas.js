//Aqui llamamos todas las dependencias que usaremos en la ruta
const express = require('express');
const ruta = express.Router();
const Producto = require('../models/productomodel');
const Cesta = require('../models/cestamodel');

//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- Esto es un río

//_______________________________________________________
//____________________________________________________________
//__________________________INICIO DE CRUD________________________
//___________________________________________________________
//______________________________________________________


//-------

//Operaciones POST creamos nuevos registros

//Peticion para registrar un producto en el registro de la cesta
ruta.post('/:id1/:id2', (req, res)=>{
    let resultado =  registrarProducto(req.params.id1, req.params.id2);
  
      resultado
          .then(cesta=>{
                  res.json({
                      valor: cesta
                  });
          })
          .catch(err => {
              res.status(400).json({error:err.message})
              
          });
  })


  //Peticion para quitar un usuario de un curso

ruta.delete('/:id1/:id2', (req, res)=> {
    let resultado = quitarProducto(req.params.id1, req.params.id2);
    resultado
        .then(cesta =>{
            res.json({
                valor:cesta
            })
        })
        .catch(err=>{
            res.status(400).json({
                error:err.message
            })
            
        })
 })



//____________________FIN DE CRUD______________________________________


//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-


//_____________________INICIO DE FUNCIONES____________________________


  //Funcion para regisrar un producto en la canasta
  async function registrarProducto(id, id1){        //id=cesta, id1=producto
    let producto = await Producto.findOne({'_id':id1});
    if (!producto){
        throw new Error('EL producto NO EXISTE EN LA DB');
    }
    let resultado = await Cesta.updateOne({'_id':id},{
        $addToSet: {
            productos:id1 //actualiza el registro del cantante, agregando el id del producto al arreglo productos
        }
    });
    //Comprueba si el documento se modifico
    //Si no se modifica es porque el id ya existe 
    if( !resultado.modifiedCount ){
            throw new Error('Este producto ya esta registrada en este cesta');
    }

    let cesta = Cesta.findById(id); //En caso de querer recuperar cesta actualizado.
    return cesta;
}


  //Funcion para quitar un producto de la cesta:
  async function quitarProducto(id, id1){           //id=cesta, id1=producto
    let resultado = await Cesta.updateOne({'_id':id}, {
        $pullAll:{
            productos:[id1] //Quita el id del producto del arreglo productos
        }
    });

    //Comprueba si se modifico la coleccion de la cesta
    //Si no se modifico es porque el id de la cancion no esta registrado en productos
    if(!resultado.modifiedCount){
        throw new Error('El producto no esta registrado en la cesta');
    }
    let cesta = await Cesta.findById(id);
    return cesta;
}



//_______________________FIN DE FUNCIONES____________________________



module.exports = ruta;
//Exportamos la ruta y finalizamos nuestra ruta para los productos