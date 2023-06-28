import express from "express";

const app = express();

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;