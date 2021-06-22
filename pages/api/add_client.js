import dbConnect from "../../models/dbConnect";
import Clients from '../../models/Client';

const addClient = async (req, res) => {
    if (req.method === 'POST') {
        await dbConnect();
        const data = req.body;

        const isMissingKey = Object.keys(data).some(key => {
            const value = data[key];
            if (!value) {
                return true;
            }
        });

        if (isMissingKey) {
            return res.status(403).send('Todos los campos son obligatorios.');
        }

        const alreadyExistClient = await Clients.findOne({
            numero: data.phoneNumber
        });

        if (alreadyExistClient) {
            res.status(403);
            return res.send('El cliente ya existe.');
        }

        try {
            const newClient = await new Clients({
                nombre: data.firstname,
                apellidoPaterno: data.lastnameFather,
                apellidoMaterno: data.lastnameMother,
                genero: data.gender,
                fecha: data.date,
                numero: data.phoneNumber
            });

            newClient.save();

            res.status(200);
            return res.send('Se ha agregado correctamente.');
        } catch (error) {
            res.status(403)
            return res.send(error);
        }
    }
}

export default addClient;