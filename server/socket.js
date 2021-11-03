import logger from "./logger.js";

const EVENTS = {
  connection: "connection",
  me: "me",
  callUser: "callUser",
  answerCall: "answerCall",
  callAccepted: "callAccepted",
  disconnect: "disconnect",
  callEnded: "callEnded",
};

function socket({ io }) {
  logger.info(`Sockets enabled`);

  io.on(EVENTS.connection, (socket) => {
    logger.info(`User connected ${socket.id}`);

    socket.emit(EVENTS.me, socket.id);

    socket.on(EVENTS.callUser, ({ userToCall, signalData, from, name }) => {
      io.to(userToCall).emit(EVENTS.callUser, {
        signal: signalData,
        from,
        name,
      });
    });

    socket.on(EVENTS.answerCall, (data) => {
      io.to(data.to).emit(EVENTS.callAccepted, data.signal);
    });

    socket.on(EVENTS.disconnect, () => {
      socket.broadcast.emit(EVENTS.callEnded);
    });
  });
}

export default socket;
