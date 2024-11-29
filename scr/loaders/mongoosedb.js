const mongoose = require("mongoose");

async function startDB(){
    await mongoose.connect(process.env.mongo);
    console.log("Conectado ao MongoDB!");
}

module.exports = startDB;

