import { createBrowserRouter } from "react-router";
import RootLayoute from "../Layoutes/RootLayoute";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashBoardLayOut from "../Layoutes/DashBoardLayOut";
import MainDashBoard from "../Pages/MainDashBoard/MainDashBoard";
import AddRequest from "../Pages/MainDashBoard/AddRequest";
import AllUsers from "../Pages/Allusers/AllUsers";
import PrivateRoutes from "../Provider/PrivateRoutes";
import MyDonateRequest from "../Pages/MainDashBoard/MyDonateRequest";
import Profile from "../Pages/Profile";
import Funding from "../Pages/Founding/Funding";
import PaymentSuccess from "../Pages/Founding/PaymentSuccess";
import PaymentCancelled from "../Pages/Founding/PaymentCancelled";

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
      {
        path: "/funding",
        Component: Funding,
      },
      {
        path: "/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "/payment-cancelled",
        Component: PaymentCancelled,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        {" "}
        <DashBoardLayOut></DashBoardLayOut>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/dashboard",
        element: <MainDashBoard></MainDashBoard>,
      },
      {
        path: "add-request",
        element: <AddRequest></AddRequest>,
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "my-donation-requests",
        element: <MyDonateRequest></MyDonateRequest>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);

export default router;
