import Clients from '../../models/Client';
import dbConnect from '../../models/dbConnect';

const getClientById = async (req, res) => {
    const id = req.query.id;
    await dbConnect();

    const client = await Clients.findOne({_id: id});

    if (client) {
        return res.status(200).send(client);
    } else {
        return res.status(403).send('No se encuentra el client.');
    }
}

export default getClientById;