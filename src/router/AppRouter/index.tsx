import React from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "router/RouteConfig";
import { Layout } from "components";
import { LogInPage } from "pages";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {Object.values(routeConfig).map(({ element, path }) => (
            <Route path={path} key={path} element={element} />
          ))}
        </Route>
        <Route path="/signin" element={<LogInPage />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
