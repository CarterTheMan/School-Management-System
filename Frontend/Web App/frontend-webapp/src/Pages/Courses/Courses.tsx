import "./Courses.css";
import { useParams, useNavigate } from 'react-router-dom';
import Cookie from 'universal-cookie';
import { AuthenticateAndReload, GetUserType } from "../../General/Functions";
import axios from 'axios';
import { useEffect } from "react";
import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import CourseCard from "../../Components/CourseCards/CourseCard";
import Cookies from "universal-cookie";
import { studentCourse } from "../../General/TableTypes";
import { baseLink, users } from "../../General/variables";

export default function Courses() {
    let navigate = useNavigate(); 
    const cookies = new Cookies();
    const [classes, setClasses] = React.useState<studentCourse[]>([]);
    const [classesLoaded, setClassesLoaded] = React.useState<boolean>(false);

    AuthenticateAndReload("/courses");

    // Get all the courses for a user
    useEffect(() => {        
        async function getCourses() {
            if (cookies.get("authenticated") != undefined) {
                // Wait to get the user type
                let userType = await GetUserType();

                if (userType == users.student) {
                    axios.get(baseLink + '/studentsCourses/' + cookies.get("authenticated")["value"], {})
                    .then(function(response) {
                        setClasses(response.data);
                        setClassesLoaded(true);
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                } 
            }
        }

        getCourses();
    }, []);
    

    return (
        <div className="course-page">
            <div className="courses-container">
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
                            <CourseCard key='{data.id}' title={data.teacherCourse.course.title} description={data.teacherCourse.course.description} id={data.id} />                       
                        )
                    })
                }
            </div>
        </div>
    )

}
