import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import CreateAccount from "../Pages/CreateAccount/CreateAccount";
import SideBar from "../Components/SideBar/SideBar";

function elementWithSidebar(render:JSX.Element): JSX.Element {
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <SideBar />
            <main>
                {render}
            </main>
        </div>
    )
}

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
        element: elementWithSidebar(<Dashboard />),
        children: []
    }
])