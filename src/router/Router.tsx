import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "../pages/Home.tsx";
import BMI from "../pages/BMI";
import Profile from "../pages/Profile";
import Meals from "../pages/Meals.tsx";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>,
    },
    {
        path:"/BMI",
        element:<BMI/>,
    },
    {
        path:"/Profile",
        element:<Profile/>,
    },
    {
        path:"/Meals",
        element:<Meals/>,
    },
    {
        path:"/404",
        element:<NotFound/>
    }

])
export const Router = () => {
    return <RouterProvider router={router} />;
};