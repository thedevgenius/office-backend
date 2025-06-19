import express from 'express';
import multer from 'multer';
import projectRoutes from './routes/project.routes';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json());
app.use(multer().none());

app.use('/', projectRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello this is ready');
});

export default app;
