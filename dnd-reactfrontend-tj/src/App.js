import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Spells from "./pages/spells";
import Favourites from "./pages/favourites";
import spellBackground from "./images/spellBackground.jpg";

function App() {
  let [xOffset, setX] = useState();
  let [yOffset, setY] = useState();
  let currentBackground =
    "url(/static/media/spellBackground.7769a55d7dbe4c6840ac.jpg)";

  const mouseMove = (e) => {
    const currentScreenWidth = e.view.screen.width;
    if (currentScreenWidth < 420) {
      return;
    }
    //moves the background to follow the mouse, with offsets to keep the image centerdd
    else setX(e.clientX + -3500);
    setY(e.clientY + -2000);
  };
  return (
    <Router>
      <div
        className="App"
        onMouseMove={mouseMove}
        style={{
          background: currentBackground,
          backgroundRepeat: "repeat-x",
          backgroundPositionX: xOffset / 4 + "px",
          backgroundPositionY: yOffset / 5 + "px",
          height: "100vh",
          margin: "0",
          padding: "0",
        }}
      >
        <header>
          <h1 id="title">DND Spell Saver</h1>
        </header>
        <nav>
          <Link to="/" className="link" id="spellsLink">
            Spells
          </Link>
          <Link to="/fav" className="link" id="favLink">
            Favourites
          </Link>
        </nav>

        <Routes>
          <Route path="/fav" element={<Favourites />} />
          <Route path="/" element={<Spells />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
