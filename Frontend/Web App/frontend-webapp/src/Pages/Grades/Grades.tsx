import "./Grades.css";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Cookie from 'universal-cookie';
import { AuthenticateAndReload } from "../../General/Authentication";
import React, { useEffect } from "react";


export default function Grades() {
    let navigate = useNavigate(); 
    const cookies = new Cookies();
    const [username, setUsername] = React.useState<String>("");

    AuthenticateAndReload("/grades");

    useEffect(() => {     
        if (cookies.get("authenticated") != undefined) {
            setUsername(cookies.get("authenticated")["username"]);
        }
    }, []);
    
    return (
        <div>
            <h1>This is the grades of {username}</h1>
        </div>
    )

}