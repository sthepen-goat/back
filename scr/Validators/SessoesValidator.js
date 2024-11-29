const { default: mongoose } = require("mongoose");
const { z } =  require("zod");
const { validateRequest } = require("zod-express-middleware");

const create = validateRequest({
    body: z.object({
        id_usuario: z.custom(mongoose.isValidObjectId, "O id não é valido"),
    }),
});

const destroy = validateRequest({
    params: z.object({
        id_usuario: z.custom(mongoose.isValidObjectId, "O id não é valido"),
    }),
});

module.exports = {
    create,
    destroy,
};