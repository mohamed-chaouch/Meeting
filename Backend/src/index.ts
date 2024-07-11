import fs from 'fs';
import express from 'express';
import path from 'path';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import dotenv from "dotenv";

import "./config/connect.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", userRouter);

app.use("/" , express.static(path.join(fs.Dir.name,"./uploads")));
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`); 
})