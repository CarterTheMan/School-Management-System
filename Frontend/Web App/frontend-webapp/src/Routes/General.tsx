import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Cookie from 'universal-cookie';
import { useEffect } from "react";

const baseLink = "http://localhost:8080";
export { baseLink };

export function AuthenticateAndReload(pageURL : string) {
    let navigate = useNavigate(); 
    const cookies = new Cookie();

    // On load of page
    useEffect(() => {
         // If not authenticated, create redirect cookie and go to login
        if (cookies.get("authenticated") == undefined) {
            const cookies = new Cookies(null, { path: '/' });
            cookies.set("redirect", pageURL);
            navigate("/login");
        }
    }, []);
}
