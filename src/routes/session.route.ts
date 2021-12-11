import { Request, Response, Router } from 'express';
import SessionModel from '../models/session.model';

export const Route = Router();

Route.get('/sessions/search', async (req: Request, res: Response) => {
    try {
        const sessions = await SessionModel.find(req.query).populate('room');
        res.json(sessions);
    } catch (error: any) {
        sendError(res, error.message);
    }
})

Route.route('/sessions')
    .get(async (_, res: Response) => {
        try {
            const sessions = await SessionModel.find().populate('movie').populate('room');
            res.status(200).json(sessions);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })
    .post(async (req: Request, res: Response) => {
        const newSession = req.body;
        try {
            let resp = await SessionModel.create(newSession);
            res.status(201).json(resp);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })

Route.route('/sessions/:id')
    .get(async (req: Request, res: Response) => {
        try {
            const session = await SessionModel.findById(req.params.id);
            res.json(session);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })
    .put(async (req: Request, res: Response) => {
        try {
            const session = await SessionModel.findByIdAndUpdate(req.params.id, req.body);
            res.json(session);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })
    .delete(async (req: Request, res: Response) => {
        try {
            const session = await SessionModel.findByIdAndDelete(req.params.id);
            res.json(session);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })

const sendError = (res: Response<any, Record<string, any>>, message: string): void => {
    res.status(500).json({ ok: false, message });
}

