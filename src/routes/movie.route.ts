import { Request, Response, Router } from 'express';
import MovieModel from '../models/movie.model';

export const Route = Router();

Route.route('/movies')
    .get(async (req: Request, res: Response) => {
        try {
            const movies = await MovieModel.find();
            res.status(200).json(movies);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })
    .post(async (req: Request, res: Response) => {
        const newMovie = req.body;
        try {
            let resp = await MovieModel.create(newMovie);
            res.status(201).json(resp);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })

Route.route('/movies/:id')
    .get(async (req: Request, res: Response) => {
        try {
            const movie = await MovieModel.findById(req.params.id);
            res.json(movie);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })
    .put(async (req: Request, res: Response) => {
        try {
            const movie = await MovieModel.findByIdAndUpdate(req.params.id, req.body);
            res.json(movie);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })
    .delete(async (req: Request, res: Response) => {
        try {
            const movie = await MovieModel.findByIdAndDelete(req.params.id);
            res.json(movie);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })

const sendError = (res: Response<any, Record<string, any>>, message: string): void => {
    res.status(500).json({ ok: false, message });
}

