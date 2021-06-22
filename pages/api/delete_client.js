import dbConnect from '../../models/dbConnect';
import Clients from '../../models/Client';

const deleteClient = async (req, res) => {
    const id = req.query.id;

    await dbConnect();

    Clients.findOneAndRemove({_id: id}, (err, client) => {
        if (err || !client) {
            return res.status(403).send('Hubo un error al intentar eliminar el cliente.');
        } else {
            return res.status(200).send('Se eliminó correctamente.');
        }
    })
}

export default deleteClient;