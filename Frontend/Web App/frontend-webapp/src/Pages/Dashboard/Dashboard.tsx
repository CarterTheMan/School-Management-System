import "./Dashboard.css";
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Cookies from 'universal-cookie';
import Cookie from 'universal-cookie';
import { useEffect } from "react";


export default function Dashboard() {
    let navigate = useNavigate(); 
    const cookies = new Cookie();

    // On load of dashboard
    useEffect(() => {
        // If not authenticated, create redirect and go to login
        if (cookies.get("authenticated") == undefined) {
            const cookies = new Cookies(null, { path: '/' });
            cookies.set("redirect", "/dashboard");
            navigate("/login");
        }
    }, []);

    // logout to the home page, destroy authenticated cookie
    const handleLogout = async function () {
        cookies.remove("authenticated");
        navigate("/");
    }
    
    return (
        <div>
            <h1>Logged in as {cookies.get("authenticated")}</h1>
            <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={handleLogout}
            sx={{ ml: 4, mr: 4, mb: 4 }}
            >
                Log out
            </Button>
        </div>
    )

}