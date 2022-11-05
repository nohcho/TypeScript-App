import "./App.css";
import Users from "./pages/UsersPage";
import { Routes, Route } from "react-router-dom";
import User from "./pages/UserIdPage";
import NotFound from "./pages/NotFoundPage";
import Header from "./components/Header";
import Footer from "./components/Footer/indes";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
