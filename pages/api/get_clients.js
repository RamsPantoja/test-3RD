import dbConnect from "../../models/dbConnect";
import Clients from '../../models/Client';

const getAllClients = async (req, res) => {
    await dbConnect();
    const clients = await Clients.find();
    
    try {
        if (clients) {
            return res.status(200).send(clients);
        }
    } catch (error) {
        return res.status(500).send('No se pueden obtener los clientes...')
    }
}

export default getAllClients;