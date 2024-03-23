import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import Summary from "./pages/Summary.jsx";
import GenMaterial from "./pages/GenMaterial.jsx";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
const App = () => {
    return (
        // <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pdfSummary" element={<Summary />} />
                <Route path="/GenMaterial" element={<GenMaterial />} />
            </Routes>
        // </Router>
    );
  };

export default App;