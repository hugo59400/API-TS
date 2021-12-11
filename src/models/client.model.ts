import { Schema, model } from 'mongoose';

const clientSchema: Schema = new Schema({
    name: {type: String, required: true},
    email: String
}, { versionKey: false });

const ClientModel = model('Client', clientSchema);
export default ClientModel;
