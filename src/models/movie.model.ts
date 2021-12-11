import { Schema, model } from 'mongoose';

const movieSchema: Schema = new Schema({
    title: { type: String, required: true },
    release_date: { type: Date, required: true },
    description: String,
    duration: { type: Number, required: true }
}, { versionKey: false });

const MovieModel = model('Movie', movieSchema);
export default MovieModel;
