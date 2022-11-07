import "./App.css";
import { Routes, Route } from "react-router-dom";
import User from "./pages/UserIdPage";
import NotFound from "./pages/NotFoundPage";
import LoginPage from "./pages/LogInPage";
import Layout from "./components/Layout";
import Auth from "./hocs";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Auth />} />
          <Route path="user/:id" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/signin" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
