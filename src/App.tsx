import "./App.css";
import Users from "./pages/UsersPage";
import { Routes, Route } from "react-router-dom";
import User from "./pages/UserIdPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
