import { useParams, useNavigate, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useEffect, useState } from "react";
import axios from 'axios';
import { baseLink } from './variables';

// If a user opens a direct link, make sure they are authenticated
// If not, redirect them to login
export function AuthenticateAndReload(pageURL : string) {
    let navigate = useNavigate(); 
    const cookies = new Cookies();

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

// Return the user type based on the cookie value
export async function GetUserType(): Promise<number> {
    const cookies = new Cookies();

    try {
        const response = await axios.post<number>(baseLink + "/user-type", { 
            value: cookies.get("authenticated")
        });
        
        return response.data;
    } catch (error) {
        console.error('Error fetching user type:', error);
        throw error; // You can handle the error as needed
    }
}

// Update the expiration time of the cookie
export function updateCookieTime() {
    const cookie = new Cookies();

    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 30);

    const value = cookie.get("authenticated");
    cookie.set("authenticated", value, { expires : expirationTime });
}