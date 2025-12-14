import { createBrowserRouter } from "react-router";
import RootLayoute from "../Layoutes/RootLayoute";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashBoardLayOut from "../Layoutes/DashBoardLayOut";
import MainDashBoard from "../Pages/MainDashBoard/MainDashBoard";

import ManageProduct from "../Pages/MainDashBoard/ManageProduct";
import AddRequest from "../Pages/MainDashBoard/AddRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayoute></RootLayoute>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashBoardLayOut></DashBoardLayOut>,
    children: [
      {
        path: "/dashboard",
        element: <MainDashBoard></MainDashBoard>,
      },
      {
        path: "/dashboard/add-request",
        element: <AddRequest></AddRequest>,
      },
      {
        path: "/dashboard/manage-product",
        element: <ManageProduct></ManageProduct>,
      },
    ],
  },
]);

export default router;
