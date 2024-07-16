import "./Dashboard.css";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Cookie from 'universal-cookie';
import { AuthenticateAndReload } from "../../Routes/General";
import { useEffect } from "react";


export default function Dashboard() {
    let navigate = useNavigate(); 
    const cookies = new Cookies();

    AuthenticateAndReload("/dashboard");
    
    return (
        <div>
            <h1>Logged in as {cookies.get("authenticated")["username"]}</h1>
            <ul>
                <li>{cookies.get("authenticated")["userType"]}</li>
                <li>{cookies.get("authenticated")["id"]}</li>
            </ul>
        </div>
    )

}