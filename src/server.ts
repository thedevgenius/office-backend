import app from './app';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
};

startServer();

// mongodb+srv://thedevgenius83:JFOF6kF9SuxG9Yyw@office.ix4ndch.mongodb.net/myoffice