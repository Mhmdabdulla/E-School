import app from "./app";
import {createServer} from 'http'
import {Server} from "socket.io"
import { initSocketServer } from "./config/socket";
import logger from "./config/logger";


const PORT = process.env.PORT || 5000;

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
})

initSocketServer(io)


  server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)

  });
