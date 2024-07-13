import "./Courses.css";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Cookie from 'universal-cookie';
import { AuthenticateAndReload } from "../../Routes/GeneralFunction";


export default function Courses() {
    let navigate = useNavigate(); 
    const cookies = new Cookie();

    AuthenticateAndReload("/courses");
    
    return (
        <div>
            <h1>These are the courses of {cookies.get("authenticated")}</h1>
        </div>
    )

}