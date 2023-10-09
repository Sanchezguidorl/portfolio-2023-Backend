const mongoose= require("mongoose");
const dotenv= require("dotenv");

dotenv.config();
mongooseConnection=async()=>{
    try {
        const db= await mongoose.connect(`mongodb+srv://${process.env.SECRETADMIN}:${process.env.SECRETPASSWORD}@portfolio-2023.vgsoxve.mongodb.net/?retryWrites=true&w=majority`);
        console.log('Conexión exitosa');
    } catch (error) {
        return new Error("Error al conectarse con la base de datos");
    }
}

module.exports= mongooseConnection;