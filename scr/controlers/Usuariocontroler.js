const usuarioModel = require("../models/usuariomodel");

class usuarioController{

    async create(req, res){
        try {
            console.log("oi")
            const usuario = await usuarioModel.create(req.body);
            console.log(usuario);
            const { senha, ...novousuario } = usuario.toObject()

            return res.status(200).json(novousuario);
        } catch(error) {
            res.status(500).json({message: "nome ou email ja usado", error:error.message});
        }
    }

    async read(req, res) {
        try{
            const usuario = await usuarioModel.find();

            return res.status(200).json(usuario)
        } catch(error){
            res.status(500).json({message: "Erro inesperado", error: error.message})
        }
    }

    async update(req, res) {
      try{
         const { id } = req.params;
         const usuarioEncontrado = await usuarioModel.findById(id);
         
         if(!usuarioEncontrado) 
            return res.status(404).json({message: "usuario não encontrado"});
         const usuario = await usuarioEncontrado.set(req.body).save();

         return res.status(200).json(usuario);
      } catch(error){
        res.status(500).json({message: "Erro inesperado", error: error.message})
      }
    }


    async delete(req, res) {
      try {
        const { id } = req.params;
        const usuarioEncontrado = await usuarioModel.findByIdAndDelete(id);
    
        if (!usuarioEncontrado)
          return res.status(404).json({ message: "Usuário não encontrado" });
    
        return res.status(200).json({ message: "Usuário deletado" });
      } catch (error) {
        res.status(500).json({ message: "Erro inesperado", error: error.message });
      }
    }
    

}

module.exports = new usuarioController()