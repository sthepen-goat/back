const startDB = require("./mongoosedb");

class Loaders{
    start(){
        startDB();
    }
}

module.exports = new Loaders();


