import { NotFoundPage, UserIdPage } from "pages";
import { RouteProps } from "react-router-dom";
import Auth from "hocs";

export enum AppRoutes {
  AUTH = "auth",
  USERIDPAGE = "userIdPage",
  NOTFOUNDPAGE = "notFoundPage",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.AUTH]: "/",
  [AppRoutes.USERIDPAGE]: "user/:id",
  [AppRoutes.NOTFOUNDPAGE]: "*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.AUTH]: {
    path: RoutePath.auth,
    element: <Auth />,
  },
  [AppRoutes.USERIDPAGE]: {
    path: RoutePath.userIdPage,
    element: <UserIdPage />,
  },
  [AppRoutes.NOTFOUNDPAGE]: {
    path: RoutePath.notFoundPage,
    element: <NotFoundPage />,
  },
};
