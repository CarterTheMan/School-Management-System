import "./Dashboard.css";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { AuthenticateAndReload } from "../../General/Functions";
import { useEffect } from "react";
import React from "react";
import { user } from "../../General/TableTypes"
import axiosInstance from "../../General/WebCalls";

export default function Dashboard() {
    let navigate = useNavigate(); 
    const cookies = new Cookies();
    const [username, setUsername] = React.useState<String>("");

    AuthenticateAndReload("/dashboard");

    useEffect(() => {     
        async function getUser() {
            console.log(cookies.get("authenticated"));
            if (cookies.get("authenticated") != undefined) {
                await axiosInstance.get<user>('/user/' + cookies.get("authenticated")["value"], {})
                    .then(function(response) {
                        setUsername(response.data.username);
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
            }
        }

        getUser();
    }, []);
    
    return (
        <div>
            <h1>Logged in as {username}</h1>
        </div>
    )
}
