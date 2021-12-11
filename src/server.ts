import express, { json, Request, Response } from 'express';
import 'colors';
import Morgan from 'morgan';
import Helmet from 'helmet';
import { connectMongo } from './config/db.config';
import { Route as MovieRoute } from './routes/movie.route';
import { Route as RoomRoute } from './routes/room.route';
import { Route as SessionRoute } from './routes/session.route';
import { Route as ClientRoute } from './routes/client.route';

const app = express();
connectMongo();

app.use(json());
app.use(Morgan('combined'));
app.use(Helmet());

app.use(MovieRoute);
app.use(RoomRoute);
app.use(SessionRoute);
app.use(ClientRoute);

// Typage fort des paramètres de fonction (Attention à la source de l'import !)
app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello !')
})

const PORT: number | string = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Express lancé sur le port ${PORT}`.cyan.bold);
});

// mongodb://localhost:27017/cinema