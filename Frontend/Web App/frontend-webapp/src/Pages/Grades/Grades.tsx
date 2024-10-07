import "./Grades.css";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Cookie from 'universal-cookie';
import { AuthenticateAndReload, baseLink } from "../../General/Authentication";
import React, { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type allGrades = {
    title: string, 
    grade: number[]
}

export default function Grades() {
    let navigate = useNavigate(); 
    const cookies = new Cookies();
    const [grades, setGrades] = React.useState<any>(null);

    AuthenticateAndReload("/grades");

    const openClass = (id : number) => {
		const link = "/course/" + id;
		navigate(link);
	}

    // Get all the grades of the user on page load
    useEffect(() => {
        async function getGrades() {
            if (cookies.get("authenticated") != undefined) {
                await axios.get(baseLink + '/studentGrades/' + cookies.get("authenticated")["id"], {})
                    .then(function(response) {
                        let newGrades = { ...grades };
                        newGrades = response.data;
                        setGrades(newGrades);
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
            }
        }

        getGrades();
    }, []);
    
    return (
        <div>
            {/* If grades are loading */}
            {(grades == null) &&
                <CircularProgress color="primary" />
            }

            {/* If grades exist */}
            {(grades != null) && 
            <div style={{width: "95%", marginTop: "5vh", marginLeft: "2.5%", marginRight: "2.5%" }}>
                <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" style={{width: "35%", fontWeight: "bold"}}>Class</TableCell>
                                <TableCell align="left" style={{width: "15%", fontWeight: "bold"}}># of assignments</TableCell>
                                <TableCell align="left" style={{width: "15%", fontWeight: "bold"}}>Grade</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(grades).map((value, i) => (
                                <TableRow
                                    key={value}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" onClick={() => openClass(grades[value][3])}>
                                        {value}
                                    </TableCell>
                                    <TableCell align="left">{grades[value][0] != null ? grades[value][1] + grades[value][2] : "0"}</TableCell>
                                    <TableCell align="left">{grades[value][0] != null ? grades[value][0] : "N/A"}</TableCell>
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
