const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SessoesModel = require("./SessoesModel");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema ({
    email : {
        type: String,
        unique: true,
    },
    senha :  {
        type : String,
        select : false,
    },
    nome : {
        type: String,
        unique: true,
    },
    cargo : String,
    status : String,
})

UsuarioSchema.pre("save", async function (next) {
    const user = this;

    if(user.isModified("senha")) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.senha, salt);

        user.senha = hash;

        console.log({ salt, hash});

    }



    next();
});

UsuarioSchema.pre(
    "deleteOne",
    { document: true, query: false},
    async function() {
        const user = this;

        return SessoesModel.deleteOne({ id_usuario: usuario_id });
    }
);

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);

module.exports = UsuarioModel;
