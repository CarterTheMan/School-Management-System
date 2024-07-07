import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import CreateAccount from "../Pages/CreateAccount/CreateAccount";


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
        element: <Dashboard />,
        children: []
    }
])