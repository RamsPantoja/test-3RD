import dbConnect from '../../models/dbConnect';
import Clients from '../../models/Client';

const editClient = async (req, res) => {
    const id = req.query.id;
    const data = req.body;

    const isMissingField = Object.keys(data).some(key => {
        const value = data[key].value;
        if (!value) {
            return true;
        }
    });

    if (isMissingField) {
        return res.status(403).send('Todos los campos son obligatorios.')
    }

    await dbConnect();

    Clients.findOneAndUpdate({_id: id}, {
        nombre: data.firstname,
        apellidoPaterno: data.lastnameFather,
        apellidoMaterno: data.lastnameMother,
        genero: data.gender,
        fecha: data.date,
        numero: data.phoneNumber
    }, (err, client) => {
        if (err || !client) {
            return res.status(403).send('Hubo un error al actualizar el cliente.');
        } else {
            return res.status(200).send('Se actualizó correctamente el cliente.');
        }
    })
}

export default editClient