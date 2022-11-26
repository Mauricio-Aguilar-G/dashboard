const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
    },
    tel: {
        type: Number,
        required: true
    },
    verificado: {
        type: Boolean,
        default: false
    }
});



module.exports = mongoose.model('Cliente', clienteSchema);