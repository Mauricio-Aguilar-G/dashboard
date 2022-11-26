//Importamos Mongoose para poder hacer nuestro Schema.
const mongoose = require('mongoose');

//Creamos nuestro Schema que usara mongoose para nuestra db.
const productSchema = mongoose.Schema({

    src:{
        type:String, 
        required:true
    },
    title:{
        type:String, 
        required:true
    },
    size:{
        type:String, 
        required:true
    },
    price:{
        type:Number, 
        required:true
    },
    activo:{
        type:Boolean,
        default:true
    },
});

//Exportamos el nombre del modelo, y nuestro Schema creado por mongoose
module.exports = mongoose.model('Producto', productSchema);