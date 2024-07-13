import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import CreateAccount from "../Pages/CreateAccount/CreateAccount";
import SideBar from "../Components/SideBar/SideBar";
import Courses from "../Pages/Courses/Courses";
import Grades from "../Pages/Grades/Grades";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: []
    }, 
    {
        path: "/login",
        element: <Login />,
        children: []
    },
    {
        path: "/createStudentAccount",
        element: <CreateAccount type={"student"} />,
        children: []
    },
    {
        path: "/dashboard",
        element:<SideBar page={<Dashboard />} />,
        children: []
    },
    {
        path: "/courses",
        element:<SideBar page={<Courses />} />,
        children: []
    },
    {
        path: "/grades",
        element:<SideBar page={<Grades />} />,
        children: []
    }
])