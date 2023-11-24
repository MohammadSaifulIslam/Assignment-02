import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { orderRoutes } from './app/modules/orders/orders.routes';
import { userRoutes } from './app/modules/users/users.routes';
const app: Application = express();
// parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
// application routes
app.use(userRoutes);
app.use(orderRoutes);

export default app;
