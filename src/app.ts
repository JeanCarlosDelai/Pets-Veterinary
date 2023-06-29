import express from "express";
import tutorRouter from './routes/tutor';
import authRouter from './routes/auth';
import errorHandlerMiddleware from './middleware/error-handler';
const app = express();

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', tutorRouter);
app.use('/auth', authRouter);

//Midleware
app.use(errorHandlerMiddleware)

export default app;