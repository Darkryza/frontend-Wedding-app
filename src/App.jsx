import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Submit from "./pages/Submit";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/submit" element={<Submit />} />
      </Routes>
    </div>
  );
}

export default App;
