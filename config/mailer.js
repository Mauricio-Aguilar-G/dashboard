const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require ('path');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'bazarenlinea13@gmail.com', // generated ethereal user
        pass: 'oqegsacqaybgnucd', // generated ethereal password
    },
});

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

transporter.use('compile', hbs(handlebarOptions));

transporter.verify().then(() => {
    console.log("Listo para enviar mensajes");
});

module.exports = {nodemailer, transporter}