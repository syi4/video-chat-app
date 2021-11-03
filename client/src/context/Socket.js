import React, { createContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import { EVENTS } from "../config/events";

export const SocketContext = createContext();

const socket = io(process.env.REACT_APP_SOCKET_URL);

export const SocketsProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [name, setName] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on(EVENTS.SOCKET.me, (id) => setMe(id));

    socket.on(EVENTS.SOCKET.callUser, ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on(EVENTS.PEER.signal, (data) => {
      socket.emit(EVENTS.SOCKET.answerCall, { signal: data, to: call.from });
    });

    peer.on(EVENTS.PEER.stream, (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on(EVENTS.PEER.signal, (data) => {
      socket.emit(EVENTS.SOCKET.callUser, {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on(EVENTS.PEER.stream, (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on(EVENTS.SOCKET.callAccepted, (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };
  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
