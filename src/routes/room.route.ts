import { Request, Response, Router } from 'express';
import RoomModel from '../models/room.model';

export const Route = Router();

Route.route('/rooms')
    .get(async (req: Request, res: Response) => {
        try {
            const rooms = await RoomModel.find();
            res.status(200).json(rooms);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })
    .post(async (req: Request, res: Response) => {
        const newRoom = req.body;
        try {
            let resp = await RoomModel.create(newRoom);
            res.status(201).json(resp);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })

Route.route('/rooms/:id')
    .get(async (req: Request, res: Response) => {
        try {
            const room = await RoomModel.findById(req.params.id);
            res.json(room);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })
    .put(async (req: Request, res: Response) => {
        try {
            const room = await RoomModel.findByIdAndUpdate(req.params.id, req.body);
            res.json(room);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })
    .delete(async (req: Request, res: Response) => {
        try {
            const room = await RoomModel.findByIdAndDelete(req.params.id);
            res.json(room);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })

const sendError = (res: Response<any, Record<string, any>>, message: string): void => {
    res.status(500).json({ ok: false, message });
}

