import React, { useEffect } from 'react';
import "./Login.css";
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import Cookies from 'universal-cookie';
import Cookie from 'universal-cookie';
import axios from 'axios';


export default function Login() {
  let params = useParams();
  let navigate = useNavigate(); 
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordIncorrect, setPasswordIncorrect] = React.useState<boolean>(false);
  const [userNotExist, setUserNotExist] = React.useState<boolean>(false);

  // On load of login
  useEffect(() => {
    // If already authenticated, go to dashboard
    const cookies = new Cookie();
    if (cookies.get("authenticated") != undefined) {
      navigate("/dashboard");
    }
  }, []);

  /**
   * If successful login, go to redirect page or the dashboard
   * 
   * Check login for all different user types so they don't have to clarify
   *  */ 
  const handleSubmit = async function () {
    console.log(params.id);
    let authenticated : boolean = false;
    let incorrectPassword : boolean = false;
    const userTypes: String[] = ["student", "teacher"];

    // Iterate through all users to try and login
    for (const userType of userTypes) {
      const response = await axios.post('http://localhost:8080/login-' + userType, {
        "username" : username, 
        "password" : password
      }).then(async function(response) {
        if (response.data == "Success") {
          authenticated = true;
        } else if (response.data == "Incorrect password") {
          incorrectPassword = true;
        } else {
          console.log(response.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      })

      // Clear the username and password fields
      setUsername("");
      setPassword("");

      if (authenticated || passwordIncorrect) {
        break;
      }
    }

    // If authenticated
    if (authenticated) {
      // Create new authentication cookie
      const cookies = new Cookies(null, { path: '/' });
      cookies.set("authenticated", username);

      // If there is a redirect cookie, go to redirect link
      if (cookies.get("redirect") != undefined) {
        const redirectLink = cookies.get("redirect");
        cookies.remove("redirect");
        navigate(redirectLink);

      // If there isn't a redirect, go to dashboard
      } else {
        navigate("/dashboard");
      }
    } else {
      if (incorrectPassword) {
        setPasswordIncorrect(true);
        setUserNotExist(false);
      } else {
        setPasswordIncorrect(false);
        setUserNotExist(true);
      }
    }
  }

  // Navigate to create a student account page
  const handleCreateStudentAccount = async function () {
    navigate("/createStudentAccount");
  }

  return (
    <div>
      <br />
      { userNotExist &&
        <p style={{color: "red", textAlign: "center"}}>That user does not exist</p>
      }
      { passwordIncorrect &&
        <p style={{color: "red", textAlign: "center"}}>The password is incorrect</p>
      }
      <div className='login-form'>
        <TextField
          type="text"
          label="Username"
          onChange={e => setUsername(e.target.value)}
          required
          value={username}
          sx={{ mt: 4, ml: 4, mr: 4, display: 'inline-flex' }}
        />
        <TextField
          type="password"
          label="Password"
          onChange={e => setPassword(e.target.value)}
          required
          value={password}
          sx={{ mt: 4, ml: 4, mr: 4, display: 'inline-flex' }}
        />
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
          sx={{ ml: 4, mr: 4, mb: 4 }}
        >
          Login
        </Button>
        <br />
        <br />
        <h3>New student?</h3>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleCreateStudentAccount}
          sx={{ ml: 4, mr: 4, mb: 4 }}
        >
          Create an account
        </Button>
      </div>
    </div>
  );
}