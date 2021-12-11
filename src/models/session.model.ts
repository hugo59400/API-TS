import { Schema, model } from 'mongoose';

const sessionSchema: Schema = new Schema({
    date: {type: Date, required: true},
    room: {type: Schema.Types.ObjectId, required: true, ref: 'Room'},
    movie: {type: Schema.Types.ObjectId, required: true, ref: 'Movie'}
}, { versionKey: false });

const SessionModel = model('Session', sessionSchema);
export default SessionModel;
