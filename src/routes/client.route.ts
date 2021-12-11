import { Request, Response, Router } from 'express';
import ClientModel from '../models/client.model';

export const Route = Router();

Route.route('/clients')
    .get(async (req: Request, res: Response) => {
        try {
            const clients = await ClientModel.find().populate('movie').populate('room').populate('room.clients');
            res.status(200).json(clients);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })
    .post(async (req: Request, res: Response) => {
        const newClient = req.body;
        try {
            let resp = await ClientModel.create(newClient);
            res.status(201).json(resp);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })

Route.route('/clients/:id')
    .get(async (req: Request, res: Response) => {
        try {
            const client = await ClientModel.findById(req.params.id);
            res.json(client);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })
    .put(async (req: Request, res: Response) => {
        try {
            const client = await ClientModel.findByIdAndUpdate(req.params.id, req.body);
            res.json(client);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })
    .delete(async (req: Request, res: Response) => {
        try {
            const client = await ClientModel.findByIdAndDelete(req.params.id);
            res.json(client);
        } catch (error: any) {
            sendError(res, error.message);
        }
    })

const sendError = (res: Response<any, Record<string, any>>, message: string): void => {
    res.status(500).json({ ok: false, message });
}

