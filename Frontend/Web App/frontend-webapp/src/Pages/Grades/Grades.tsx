import "./Grades.css";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Cookie from 'universal-cookie';
import { AuthenticateAndReload } from "../../Routes/GeneralFunction";


export default function Grades() {
    let navigate = useNavigate(); 
    const cookies = new Cookie();

    AuthenticateAndReload("/grades");
    
    return (
        <div>
            <h1>This is the grades of {cookies.get("authenticated")}</h1>
        </div>
    )

}