import React, { useContext } from "react";
import { SocketContext } from "../context/Socket";
import { Col, Container, Figure } from "react-bootstrap";

export const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  return (
    <Container className="d-flex justify-content-center">
      {stream && (
        <Figure style={{ padding: "10px", margin: "10px" }}>
          <Col xs={12} md={6}>
            <h3>{name || "Name"}</h3>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              style={{ maxWidth: "550px" }}
            />
          </Col>
        </Figure>
      )}
      {callAccepted && !callEnded && (
        <Figure style={{ padding: "10px", margin: "10px" }}>
          <Col xs={12} md={6}>
            <h3>{call.name || "Name"}</h3>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              style={{ maxWidth: "550px" }}
            />
          </Col>
        </Figure>
      )}
    </Container>
  );
};
