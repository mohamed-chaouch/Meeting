import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import dotenv from "dotenv";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import "./config/connect.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", userRouter);
app.use('/', express.static(join(__dirname, './uploads')));
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
