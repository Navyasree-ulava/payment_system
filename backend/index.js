import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes/index.js";
import cors from 'cors';
import { connectDB } from "./db.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json());

connectDB();

app.get("/health", (req, res) => {
    res.json({
        status: "success",
        message: "API is running"
    })
})

const PORT = process.env.PORT || 3000;

app.use('/api/v1', mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

