import { handleReq } from "./tasks/tasks.controller";
import { connectDB } from "./database/db";
import express, { Request, Response } from "express";

const server = express();

server.use(express.json());

handleReq(server);

server.use((req: Request, res: Response) => {
    res.status(404).json({message: 'route not found!'});
});


connectDB().then(() =>{
    server.listen(3000, () => console.log('Server running at http://localhost:3000'));
})