import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/indes";
import Header from "../Header";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default Layout;
