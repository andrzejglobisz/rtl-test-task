import { Document, model, Schema } from 'mongoose';
import { Movie } from '../types/types';

export type MovieModel = Document & Movie;

export const CastSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    birthday: { type: String, required: false },
});

export const MovieSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    cast: { type: [CastSchema], required: true },
});

export default model<MovieModel>('MovieModel', MovieSchema);
