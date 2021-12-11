// les imports sont tree-shakable
import { connect } from 'mongoose';
import 'colors';

const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DB = process.env.MONGO_DB || 'cinema';

const uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

/**
 * Connexion à Mongo via Mongoose avec gestion d'erreur
 */
export const connectMongo = async () => {
    try {
        await connect(uri);
        console.log('Connection à Mongo'.green.bold);
    } catch (error) {
        console.error(`${error}`.red.bold);
    }
}
