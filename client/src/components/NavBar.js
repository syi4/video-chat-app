import React from "react";
import { Navbar } from "react-bootstrap";

export const NavBar = () => {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      style={{
        width: "500px",
        margin: "30px 100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
      }}
    >
      <Navbar.Brand>Video Chat</Navbar.Brand>
    </Navbar>
  );
};
