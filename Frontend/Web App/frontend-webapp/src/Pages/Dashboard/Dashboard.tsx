import "./Dashboard.css";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Cookie from 'universal-cookie';
import { AuthenticateAndReload } from "../../General/Authentication";
import { useEffect } from "react";
import React from "react";


export default function Dashboard() {
    let navigate = useNavigate(); 
    const cookies = new Cookies();
    const [username, setUsername] = React.useState<String>("");

    AuthenticateAndReload("/dashboard");

    useEffect(() => {     
        if (cookies.get("authenticated") != undefined) {
            // TODO: Update to use new cookie
            setUsername(cookies.get("authenticated")["username"]);
        }
    }, []);
    
    return (
        <div>
            <h1>Logged in as {username}</h1>
        </div>
    )

}