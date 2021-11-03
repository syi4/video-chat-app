import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import socket from "./socket.js";
import logger from "./logger.js";

const PORT = process.env.PORT || 4000;

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", (_, res) => res.send("Server running"));

httpServer.listen(PORT, () => {
  logger.info(`Server running on port:${PORT}`);

  socket({ io });
});
