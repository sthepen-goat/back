const { default: mongoose } = require("mongoose");
const { z } =  require("zod");
const { validateRequest } = require("zod-express-middleware");


const create = validateRequest({
    body: z.object({
        nome: z.string({ required_error:"O nome é obrigatorio"}),
        email: z
        .string({ required_error: "O email é obrigatorio"})
        .email("O email é inválido"),
        senha: z.string({ required_error: "A senha é obrigatoria"}),
        cargo: z.string({ required_error: "O cargo é obrigatorio"}),
        status: z.string({required_error: "O status é obrigatorio"}),
    }),
});

const destroy = validateRequest({
    params: z.object({
        id: z.custom(mongoose.isValidObjectId, "O id não é valido"),
    }),
});

const update = validateRequest({
    body: z.object({
        nome: z.string().optional(),
        email: z.string().email("O email é inválido").optional(),
        senha: z.string().optional(),
        cargo: z.string().optional(),
        status: z.string().optional(),
    }),
    params: z.object({
        id: z.custom(mongoose.isValidObjectId, "O id não é valido"),
    }),
});

module.exports =  {
    create,
    destroy,
    update,
};