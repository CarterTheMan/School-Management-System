import "./Dashboard.css";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Cookie from 'universal-cookie';
import { AuthenticateAndReload } from "../../Routes/GeneralFunction";


export default function Dashboard() {
    let navigate = useNavigate(); 
    const cookies = new Cookie();

    AuthenticateAndReload("/dashboard");
    
    return (
        <div>
            <h1>Logged in as {cookies.get("authenticated")}</h1>
        </div>
    )

}