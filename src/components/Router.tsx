import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import BMI from "../pages/BMI";
import Profile from "../pages/Profile";
import Calories from "../pages/Calories";
import { Link } from "../constants/links";

const router = createBrowserRouter([
  {
    path: Link.DASHBOARD,
    element: <Home />,
  },
  {
    path: Link.BMI,
    element: <BMI />,
  },
  {
    path: Link.CALORIES,
    element: <Calories />,
  },
  {
    path: Link.PROFILE,
    element: <Profile />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
