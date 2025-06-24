import express from 'express';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import projectRoutes from './routes/project.routes';
import authRoutes from './routes/auth.routes';
import roleRoutes from './routes/role.routes';

const app = express();

app.use(express.json());
app.use(multer().none());
app.use(cookieParser())

app.use('/', projectRoutes);
app.use('/', authRoutes);
app.use('/', roleRoutes);

app.get('/', (req, res) => {
    res.send('Hello this is ready');
});

export default app;
