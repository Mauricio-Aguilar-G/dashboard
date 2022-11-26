const express = require('express');
const payload = require('payload');

require('dotenv').config();
const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});

// Add your own express routes here
const productos = require('./routes/productos')
const lugares = require('./routes/lugares')
const cestas = require('./routes/cestas')
const registroCestas = require('./routes/registroCestas')
const clientes = require('./routes/clientes')
const vToken = require('./routes/verificacionToken')
const ordenes = require('./routes/ordenes')

app.use('/api/productos', productos);
app.use('/api/lugares', lugares);
app.use('/api/cestas', cestas);
app.use('/api/registrocestas', registroCestas);
app.use('/api/clientes', clientes.ruta);
app.use('/api/vtoken', vToken);
app.use('/api/ordenes', ordenes);

app.listen(3000);
