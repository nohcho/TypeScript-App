import "./App.css";
import Users from "./pages/UsersPage";
import { Routes, Route } from "react-router-dom";
import User from "./pages/UserIdPage";
import NotFound from "./pages/NotFoundPage";
import LoginPage from "./pages/LogInPage";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<Users />} />
          <Route path="home/user/:id" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
