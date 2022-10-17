import "./App.css";
import Users from "./pages/UsersPage";
import { Routes, Route } from "react-router-dom";
import User from "./pages/UserIdPage";
import NotFound from "./pages/NotFoundPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
