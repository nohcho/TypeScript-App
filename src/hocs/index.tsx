import { FC } from "react";
import { Navigate } from "react-router-dom";
import Users from "../pages/UsersPage";
import { user } from "../constants";

const Auth: FC = () => {
  const isAuthenticated = localStorage.getItem(user);
  if (isAuthenticated) {
    return <Users />;
  }

  return <Navigate to={"/signin"} />;
};

export default Auth;
