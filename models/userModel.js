const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    userId : Number,
    nombre : String,
    correo : String,
    contraseña : String,
})

const User = mongoose.model('User', userSchema);

module.exports = User;