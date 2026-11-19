// Builds the Express app (no listening here, so tests can import it).
import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import routes from './routes/index.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const app = express();

app.disable('x-powered-by');
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: '20kb' }));
if (config.env !== 'test') app.use(requestLogger);

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);
