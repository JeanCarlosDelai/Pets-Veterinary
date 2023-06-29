import express from "express";
import tutorRouter from './routes/tutor'
const app = express();

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', tutorRouter);

export default app;