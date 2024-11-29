const { Router } = require("express");
const UsuarioController = require("./controlers/Usuariocontroler");
const SessoesControler = require("./controlers/SessoesControler");
const AuthController = require("./controlers/authcontroller");
const UsuarioValidator = require("./Validators/UsuarioValidator");
const SessoesValidator = require("./Validators/SessoesValidator");
const AuthValidator = require("./Validators/AuthValidator");
const verificarJwt =  require("./Middlewares/verificarJwt");
const verificarusuario = require("./Middlewares/verificar");

const rotas = Router();

rotas.post('/usuarios', UsuarioValidator.create, UsuarioController.create);
rotas.get('/usuarios', verificarJwt, UsuarioController.read);
rotas.delete('/usuarios/:id', verificarJwt, verificarusuario, UsuarioValidator.destroy, UsuarioController.delete);
rotas.put('/usuarios/:id', verificarJwt, verificarusuario ,UsuarioValidator.update,  UsuarioController.update);

rotas.post('/Sessoes', SessoesValidator.create, SessoesControler.create);
rotas.get('/Sessoes', SessoesControler.read);
rotas.delete('/Sessoes/:id_usuario',  SessoesValidator.destroy, SessoesControler.delete);

rotas.post("/login", AuthValidator.login, AuthController.login);


module.exports = rotas