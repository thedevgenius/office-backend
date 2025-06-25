import express from 'express';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authMiddleware from './middleware/auth.middleware';
import projectRoutes from './routes/project.routes';
import authRoutes from './routes/auth.routes';
import roleRoutes from './routes/role.routes';
import clientRoutes from './routes/client.routes';
import userRoutes from './routes/user.routes';

const app = express();

app.use(express.json());
app.use(multer().none());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use('/', projectRoutes);
app.use('/', authRoutes);
app.use('/', roleRoutes);
app.use('/', clientRoutes);
app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello this is ready');
});

export default app;
