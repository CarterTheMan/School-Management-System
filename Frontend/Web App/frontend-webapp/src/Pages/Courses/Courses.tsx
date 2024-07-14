import "./Courses.css";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Cookie from 'universal-cookie';
import { AuthenticateAndReload, baseLink } from "../../Routes/General";
import axios from 'axios';
import { useEffect } from "react";
import React from "react";
import CircularProgress from '@mui/material/CircularProgress';



export default function Courses() {
    let navigate = useNavigate(); 
    const cookies = new Cookie();
    const [classes, setClasses] = React.useState<any[]>([{}]);
    const [noClasses, setNoClasses] = React.useState<boolean>(false);
    const [multipleClasses, setMultipleClasses] = React.useState<boolean>(false);
    const [classesLoaded, setClassesLoaded] = React.useState<boolean>(false);

    AuthenticateAndReload("/courses");
    
    // Get all the courses for a user
    useEffect(() => {
        async function getCourses() {
            axios.get(baseLink + '/studentsCourses/' + cookies.get("authenticated")["id"], {})
                .then(function(response) {
                    setClasses(response.data);
                    setClassesLoaded(true);
                })
                .catch(function(error) {
                    console.log(error);
                })
        }

        getCourses();
    }, []);
    

    return (
        <div>
            <h1>These are the courses of {cookies.get("authenticated")["username"]}</h1>

            {/* If classes aren't loaded */}
            {!classesLoaded && 
                <CircularProgress color="primary" />
            }
            
            {/* If no classes */}
            {classesLoaded && classes.length == 0 &&
                <h1>Sorry! You aren't in any classes.</h1>
            }


            {/* If one or more classes */}
            {classesLoaded && classes.length > 0 &&
                classes.map(function(data) {
                    return (
                        <h1>{data.teacherCourse.course.title}</h1>
                    )
                })
            }

        </div>
    )

}