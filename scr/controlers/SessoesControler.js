const SessoesModel = require("../models/SessoesModel");
const UsuarioModel = require("../models/usuariomodel");

class SessoesControler{

    async create(req, res){
        try{
            const usuarioEncontrado = await UsuarioModel.findById(
                req.body.id_usuario
            );
            if(!usuarioEncontrado) return res.status(404).json({ message: "Usuario não encontrado"});

            const Sessoes = await SessoesModel.create(req.body);

            return res.status(200).json(Sessoes);
        } catch (error){
            res.status(500).json({message: "Erro inesperado", error: error.message})
        }
    }

    async read(req, res) {
        try{
            const Sessoes = await SessoesModel.find().populate('id_usuario', '-senha');

            return res.status(200).json(Sessoes)
        } catch (error){
            res.status(500).json({message: "Erro inesperado", error: error.message})
        }
    }
    
    async delete(req, res) {
        try {
          const { id_usuario } = req.params;
          const usuarioEncontrado = await   SessoesModel.findByIdAndDelete(id_usuario);
      
          if (!usuarioEncontrado)
            return res.status(404).json({ message: "Usuário não encontrado" });
      
          return res.status(200).json({ message: "Usuário deletado" });
        } catch (error) {
          res.status(500).json({ message: "Erro inesperado", error: error.message });
        }
      }

}

module.exports = new SessoesControler()