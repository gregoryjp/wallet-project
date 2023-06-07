const mongoose = require('mongoose');


const dbConnect = () => {

    try {
        const DB_URI = process.env.DB_URI;
        mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, console.log('###CONEXION CORRECTA##'));
    } catch (error) {
        console.log('###CONEXION INCORRECTA####')
    }


}



module.exports = dbConnect;