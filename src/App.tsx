import "App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Auth from "hocs";
import { LogInPage, NotFoundPage, UserIdPage } from "pages";
import { Layout } from "components";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Auth />} />
          <Route path="user/:id" element={<UserIdPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/signin" element={<LogInPage />} />
      </Routes>
    </div>
  );
}

export default App;
