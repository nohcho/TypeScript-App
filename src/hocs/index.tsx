import { FC } from "react";
import { Navigate } from "react-router-dom";
import { user } from "constants/index";
import { UsersPage } from "pages";

const Auth: FC = () => {
  const isAuthenticated = localStorage.getItem(user);
  if (isAuthenticated) {
    return <UsersPage />;
  }

  return <Navigate to={"/signin"} />;
};

export default Auth;
