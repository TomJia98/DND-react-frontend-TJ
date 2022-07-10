import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Spells from "./pages/spells";
import Favourites from "./pages/favourites";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Working Title</h1>
        </header>
        <nav>
          <Link to="/" className="link">
            All Spells
          </Link>
          <Link to="/fav" className="link">
            Your Favourites
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
