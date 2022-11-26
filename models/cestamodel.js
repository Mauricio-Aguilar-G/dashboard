//Importamos Mongoose para poder hacer nuestro Schema.
const mongoose = require('mongoose');

//Creamos nuestro Schema que usara mongoose para nuestra db.
const cestaSchema = mongoose.Schema({

    productos:{
        type:[String]
    },
    valPedido:{
        type:Number,
        default:0,
        required:true
    },
    envPlat:{
        type:Number,
        default: 10
    },
    activo:{
        type:Boolean,
        default: true
    }
});

//Exportamos el nombre del modelo, y nuestro Schema creado por mongoose
module.exports = mongoose.model('Cesta', cestaSchema);