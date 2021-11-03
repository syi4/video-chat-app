import React, { useContext } from "react";
import { SocketContext } from "../context/Socket";
import { Button } from "react-bootstrap";

export const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>{call.name} is calling: </h1>
          <Button
            variant="success"
            onClick={answerCall}
            style={{ marginLeft: "20px" }}
          >
            Answer
          </Button>
        </div>
      )}
    </>
  );
};
