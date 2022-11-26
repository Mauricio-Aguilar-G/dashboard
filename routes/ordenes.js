//Aqui llamamos todas las dependencias que usaremos en la ruta
const express = require('express');
const ruta = express.Router();
const Orden = require('../models/ordenmodel');
const Cesta = require('../models/cestamodel');
const Lugar = require('../models/lugarmodel');
const Cliente = require('../models/clientemodel');


//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- Esto es un río

//_______________________________________________________
//____________________________________________________________
//__________________________INICIO DE CRUD________________________
//___________________________________________________________
//______________________________________________________


//-------


//Operaciones del GET (muestra nuestros registros)


//Esta ruta te muestra todos los productos y ya.
ruta.get('/act', (req, res) => {
    let resultado = listarOrdenesActivas();
    resultado
        .then(ordenes => {
            res.json(ordenes);
        })
        .catch(err => {
            res.status(400).json({
                error:err
            });
        });
});

//Esta ruta te muestra todos los productos y ya.
ruta.get('/', (req, res) => {
    let resultado = listarOrdenes();
    resultado
        .then(ordenes => {
            res.json(ordenes);
        })
        .catch(err => {
            res.status(400).json({
                error:err
            });
        });
});


ruta.get('/:id', (req, res) => {
    let resultado = OrdenesId(req.params.id);
    resultado
        .then(orden => {
            res.json(orden);
        })
        .catch(err => {
            res.status(400).json({
                error:err
            });
        });
});

//-------

//Operaciones POST creamos nuevos registros

//Peticion para registrar los ids necesarios en el registro de la orden 
ruta.post('/:id1/:id2/:id3', (req, res)=>{
    let resultado =  registrarTodo(req.params.id1, req.params.id2, req.params.id3);
  
      resultado
          .then(orden=>{
                  res.json({
                      valor: orden
                  });
          })
          .catch(err => {
              res.status(400).json({error:err.message})
              
          });
  })

  //-----------------

  //Operaciones DELETE donde borramos  registros

  
//Esta ruta sirve para desactivar la orden, darle un valor falso a activo. 
ruta.delete('/:id', (req, res) => {
    let resultado = desactivarOrden(req.params.id);
 
    resultado
             .then(orden => {
                 res.json({
                     valor:orden
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


  //Funcion para regisrar todo en la orden
  async function registrarTodo(idCesta, idLugar, idCliente){        //id=cesta, id1=producto
    let cliente = await Cliente.findOne({'_id':idCliente});
    if (!cliente){
        throw new Error('El cliente NO EXISTE EN LA DB');
    }

    let cesta = await Cesta.findOne({'_id':idCesta});
    if (!cesta){
        throw new Error('La cesta NO EXISTE EN LA DB');
    }

    let lugar = await Lugar.findOne({'_id':idLugar});
    if (!lugar){
        throw new Error('El Lugar NO EXISTE EN LA DB');
    }

    let orden = new Orden({
        cliente: cliente._id,
        cesta: cesta._id,
        lugar: lugar._id
    });

    return await orden.save()

}


//Esta funcion te muestra todos los ordenes activos
async function listarOrdenesActivas(){
    let ordenes = await Orden.find({"activo":true});
    return ordenes;
}




//Esta funcion te muestra todos los ordenes activos
async function listarOrdenes(){
    let ordenes = await Orden.find();
    return ordenes;
}


//Esta funcion manda false al estado activo.
async function desactivarOrden(id){
    let orden = await Orden.findByIdAndUpdate(id,{
        $set:{
            activo: false
        }
    }, {new: true});
    
    return orden;

}


async function OrdenesId(id){
    let orden = await Orden.find({"_id":id});
    return orden;
}



//_______________________FIN DE FUNCIONES____________________________



module.exports = ruta;
//Exportamos la ruta y finalizamos nuestra ruta para los productos