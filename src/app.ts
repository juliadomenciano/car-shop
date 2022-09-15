import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import carRouter from './router/CarRouter';
import motorcycleRouter from './router/MotorcycleRouter';

const app = express();
app.use(express.json());
app.use(carRouter);
app.use(motorcycleRouter);
app.use(errorHandler);

export default app;
