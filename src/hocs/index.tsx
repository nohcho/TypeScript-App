import { FC } from "react";
import { Navigate } from "react-router-dom";
import Users from "../pages/UsersPage";
const Auth: FC = () => {
  const isAuthenticated = localStorage.getItem("auth.user") as any;
  if (isAuthenticated) {
    return <Users />;
  }

  return <Navigate to={"/signin"} />;
};

export default Auth;
