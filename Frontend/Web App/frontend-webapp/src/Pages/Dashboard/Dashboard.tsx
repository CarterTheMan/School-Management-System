import "./Dashboard.css";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { AuthenticateAndReload } from "../../General/Functions";
import { useEffect } from "react";
import React from "react";
import { baseLink } from "../../General/variables";
import { user } from "../../General/TableTypes"

export default function Dashboard() {
    let navigate = useNavigate(); 
    const cookies = new Cookies();
    const [username, setUsername] = React.useState<String>("");

    AuthenticateAndReload("/dashboard");

    useEffect(() => {     
        async function getUser() {
            if (cookies.get("authenticated") != undefined) {
                await axios.get<user>(baseLink + '/user/' + cookies.get("authenticated"), {})
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