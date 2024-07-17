import "./Course.css";
import { useParams, useNavigate } from 'react-router-dom';
import Cookie from 'universal-cookie';
import { AuthenticateAndReload, baseLink, } from "../../Routes/General";
import axios from 'axios';
import { useEffect } from "react";
import React from "react";
import Cookies from "universal-cookie";


export default function Course() {
    let navigate = useNavigate(); 
    let params = useParams();
    const [assignments, setAssignments] = React.useState<any[]>([]);
    const cookies = new Cookies();

    AuthenticateAndReload("/course/" + params.courseId);
    
    // Get all the assignments for a class on page load
    useEffect(() => {
        async function getAssignments() {
            await axios.get(baseLink + '/courseAssignments/' + params.courseId, {})
                .then(function(response) {
                    setAssignments(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                })
        }

        getAssignments();
    }, []);
    
    // What table to use: https://www.material-react-table.com/docs/guides/row-selection#relevant-table-options
    return (
        <div>

        </div>
    )

}