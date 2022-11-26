//Importamos Mongoose para poder hacer nuestro Schema.
const mongoose = require('mongoose');

//Creamos nuestro Schema que usara mongoose para nuestra db.
const lugarSchema = mongoose.Schema({

    lugar:{
        type:String, 
        required:true
    },
    horario:{
        type:String,
        required:true
    },
    fecha:{
        type:String,
        required:true
    }
});

//Exportamos el nombre del modelo, y nuestro Schema creado por mongoose
module.exports = mongoose.model('Lugar', lugarSchema);