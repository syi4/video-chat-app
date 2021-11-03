import React from "react";
import { VideoPlayer } from "./components/VideoPlayer";
import { CallPanel } from "./components/CallPanel";
import { NavBar } from "./components/NavBar";
import { Notifications } from "./components/Notifications";
import "./bootstrap.min.css";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <NavBar />
      <VideoPlayer />
      <CallPanel>
        <Notifications />
      </CallPanel>
    </Container>
  );
};

export default App;
