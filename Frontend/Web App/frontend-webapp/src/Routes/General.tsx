import { useParams, useNavigate, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Cookie from 'universal-cookie';
import { useEffect } from "react";

const baseLink = "http://localhost:8080";
export { baseLink };

// If a user opens a direct link, make sure they are authenticated
// If not, redirect them to login
export function AuthenticateAndReload(pageURL : string) {
    let navigate = useNavigate(); 
    const cookies = new Cookie();

    // On load of page
    useEffect(() => {
        // If not authenticated, create redirect cookie and go to login page
        if (cookies.get("authenticated") == undefined) {
            const cookies = new Cookies(null, { path: '/' });
            cookies.set("redirect", pageURL);
            navigate("/login");
        }
    }, []);
}

// Make sure a user is on a page they are allowed to access
export async function UserAllowedOnPage(userId: number, userName: String) {
    const cookies = new Cookies();
    let navigate = useNavigate(); 

    if (cookies.get("authenticated")["username"] != userName || cookies.get("authenticated")["id"] != userId) {
        cookies.remove("authenticated", {path: "/"});
        navigate("/login");
    }
}
