import React, { useState, useContext } from "react";
import { SocketContext } from "../context/Socket";
import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const CallPanel = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  return (
    <Container style={{ width: "600px", margin: "35px 0", padding: 0 }}>
      <Card style={{ border: "none" }}>
        <Form>
          <Row>
            <Col>
              <Card.Header style={{ textAlign: "center", fontSize: "25px" }}>
                Account Info
              </Card.Header>
              <Form.Control
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-3"
              />
              <CopyToClipboard text={me}>
                <Button style={{ width: "100%" }}>Copy Your ID</Button>
              </CopyToClipboard>
            </Col>
            <Col>
              <Card.Header style={{ textAlign: "center", fontSize: "25px" }}>
                Make a call
              </Card.Header>
              <Form.Control
                placeholder="ID to call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                className="mb-3"
                border
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="danger"
                  style={{ width: "100%" }}
                  onClick={leaveCall}
                >
                  Hang Up
                </Button>
              ) : (
                <Button
                  variant="info"
                  style={{ width: "100%" }}
                  onClick={() => callUser(idToCall)}
                >
                  Call
                </Button>
              )}
            </Col>
          </Row>
        </Form>
        <Row className="mt-4">{children}</Row>
      </Card>
    </Container>
  );
};
