import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home.js";
import { Login } from "./pages/Login/Login";
import { Navbar } from "./components/Navbar/Navbar";
import {CreatePost} from "./pages/CreatePost/CreatePost.js"
import { NotFound404 } from "./pages/NotFound404"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
