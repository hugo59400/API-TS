import { Schema, model } from 'mongoose';

const roomSchema: Schema = new Schema({
    name: {type: String, required: true}
}, { versionKey: false });

const RoomModel = model('Room', roomSchema);
export default RoomModel;
