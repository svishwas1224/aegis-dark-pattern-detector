import React from "react";

function Home() {
  const pageStyle = {
    backgroundColor: "#1a1a1a", // dark background
    color: "white",             // text color
    minHeight: "100vh",         // full viewport height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  };

  return (
    <div style={pageStyle}>
      <h1>Welcome to the Home Page</h1>
      <p>This page has a custom background color.</p>
    </div>
  );
}

export default Home;