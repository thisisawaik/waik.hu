import * as express from 'express'
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();

const httpServer = createServer(app);
const options = { /* ... */ };
const io = new Server(httpServer, options);

io.on("connection", (socket: Socket) => { /* ... */ });

httpServer.listen(3000);