import "./Course.css";
import { useParams, useNavigate } from 'react-router-dom';
import Cookie from 'universal-cookie';
import { AuthenticateAndReload, baseLink } from "../../General/Authentication";
import axios from 'axios';
import { useEffect } from "react";
import React from "react";
import Cookies from "universal-cookie";
import CircularProgress from '@mui/material/CircularProgress';
import { studentAssignment } from "../../General/TableTypes";


export default function Course() {
    let navigate = useNavigate(); 
    let params = useParams();
    const [assignments, setAssignments] = React.useState<studentAssignment[]>([]);
    const cookies = new Cookies();

    AuthenticateAndReload("/course/" + params.courseId);
    
    // Get all the assignments for a class on page load
    useEffect(() => {
        async function getAssignments() {
            if (cookies.get("authenticated") != undefined) {
                await axios.get(baseLink + '/studentAssignments/' + params.courseId + '/' + cookies.get("authenticated")["id"], {})
                    .then(function(response) {
                        let newAssignments = { ...assignments };
                        newAssignments = response.data;
                        setAssignments(newAssignments);
                        console.log(response.data);
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
            }
        }

        getAssignments();
    }, []);

    
    // What table to use: https://www.material-react-table.com/docs/guides/row-selection#relevant-table-options
    return (
        <div>
            {/* If assignments don't exist */}
            {(assignments.length == 0) &&
                <CircularProgress color="primary" />
            }

            {/* If assignments exist */}
            {(assignments.length > 0) && 
            assignments.map(
                function(data) {
                    if (data.studentCourse.student != undefined) {
                        return (
                            <p key='{data.studentCourse.id}'>{data.studentCourse.student.id}</p>                       
                        )
                    } 
                })
            }
        </div>
    )

}
