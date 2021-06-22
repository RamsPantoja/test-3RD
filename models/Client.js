import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    nombre: String,
    apellidoPaterno: String,
    apellidoMaterno: String,
    genero: String,
    fecha: String,
    numero: String
});


export default mongoose.models.Clients || mongoose.model('Clients', clientSchema)

