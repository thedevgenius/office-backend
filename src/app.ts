    import express from 'express';
    import multer from 'multer';
    import projectRoutes from './routes/project.routes';

    const app = express();

    app.use(express.json());
    app.use(multer().none());


    app.use('/', projectRoutes);

    app.get('/api', (req, res) => {
        res.send('Hello this is ready');
    });

    export default app;
