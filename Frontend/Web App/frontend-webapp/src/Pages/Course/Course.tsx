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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function Course() {
    let navigate = useNavigate(); 
    let params = useParams();
    const [assignments, setAssignments] = React.useState<studentAssignment[]>([]);
    const [overallGrade, setOverallGrade] = React.useState<number>(0);
    const cookies = new Cookies();

    AuthenticateAndReload("/course/" + params.courseId);
    
    // Get all the assignments for a class on page load
    useEffect(() => {
        async function getAssignments() {
            if (cookies.get("authenticated") != undefined) {
                // TODO: Update to use new cookie
                await axios.get(baseLink + '/studentAssignments/' + params.courseId + '/' + cookies.get("authenticated")["id"], {})
                    .then(function(response) {
                        let newAssignments = { ...assignments };
                        newAssignments = response.data;
                        setAssignments(newAssignments);

                        let grade = 0;
                        let numOfGrades = 0;
                        for (let i = 0; i < response.data.length; i++) {
                            if (response.data[i].grade != null) {
                                grade += response.data[i].grade;
                                numOfGrades++;
                            }
                        }
                        grade = grade / numOfGrades;
                        grade = Math.round(grade * 100) / 100;
                        setOverallGrade(grade);
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
            <div style={{width: "95%", marginTop: "5vh", marginLeft: "2.5%", marginRight: "2.5%" }}>
                <b>Overall Grade: {overallGrade}</b>
                <br />
                <br />
                <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" style={{width: "15%", fontWeight: "bold"}}>Assignment</TableCell>
                                <TableCell align="left" style={{width: "20%", fontWeight: "bold"}}>Description</TableCell>
                                <TableCell align="left" style={{width: "10%", fontWeight: "bold"}}>Grade</TableCell>
                                <TableCell align="left" style={{width: "30%", fontWeight: "bold"}}>Feedback</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assignments.map((data) => (
                                <TableRow
                                    key={data.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {data.courseAssignment.title}
                                    </TableCell>
                                    <TableCell align="left">{data.courseAssignment.description}</TableCell>
                                    <TableCell align="left">{data.grade != null ? Math.round(data.grade * 100) / 100 : ""}</TableCell>
                                    <TableCell align="left">{data.feedback}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            }
        </div>
    )
}
