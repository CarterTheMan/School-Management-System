import "./Grades.css";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Cookie from 'universal-cookie';
import { AuthenticateAndReload } from "../../Routes/General";


export default function Grades() {
    let navigate = useNavigate(); 
    const cookies = new Cookies();

    AuthenticateAndReload("/grades");
    
    return (
        <div>
            <h1>This is the grades of {cookies.get("authenticated")["username"]}</h1>
        </div>
    )

}