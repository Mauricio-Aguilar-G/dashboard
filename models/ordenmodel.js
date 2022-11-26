//Importamos Mongoose para poder hacer nuestro Schema.
const mongoose = require('mongoose');

//Creamos nuestro Schema que usara mongoose para nuestra db.
const ordenSchema = mongoose.Schema({

    cliente:{
        type:String
    },
    cesta:{
        type:String
    },
    lugar:{
        type:String
    },
    activo:{
        type:Boolean,
        default: true
    },
    fecha:{
        type:Date,
        default: Date.now
    }

});

//Exportamos el nombre del modelo, y nuestro Schema creado por mongoose
module.exports = mongoose.model('Orden', ordenSchema);