const express = require('express');
const Joi = require('joi');
const ruta = express.Router();
const clientes = require('./clientes');
const Cliente = require('../models/clientemodel');
const jwt = require("jsonwebtoken");
const tokenDef = clientes.tokenDef;

ruta.post("/login", (req, res) => {
    const status = {
        status: 'success'
    }

    jwt.sign({status}, req.body.token, {expiresIn: '120s'}, (err, token) => {
        if (err){
            console.log(err)
        }
        else{
            res.json({
                token
            });
        }
    });

});

ruta.post("/posts/:id", verifyToken, (req, res) => {
    
    jwt.verify(req.token, tokenDef[0], (error, authData) => {
        if (error) {
            res.sendStatus(403);
        } else {
            
            let resultado = insertarVerify(req.params.id);
 
            resultado
                    .then(cliente => {
                        res.json({
                            valor:cliente
                        });
                    })
                    .catch( err => {
                        res.status(400).json({
                            error:err
                        });
                    }); 
        }
    });
});

// Authorization: Bearer <token>
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


async function insertarVerify(id){
    let cliente = await Cliente.findByIdAndUpdate(id,{
        $set:{
            verificado: true
        }
    }, {new: true});
    
    return cliente;

}

module.exports = ruta;