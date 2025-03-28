import React, { useEffect } from 'react';
import "./Login.css";
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { baseLink } from '../../General/variables';
import { updateCookieTime } from '../../General/Functions';


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
    const cookies = new Cookies();
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
    let authenticated : boolean = false;
    let incorrectPassword : boolean = false;
    let value : String = "";

    // Try to login the user
    await axios.post(baseLink + '/login-user', {
      "username" : username, 
      "password" : password
    })  
    .then(function(response) {
      if (response.data == "Incorrect password") {
        incorrectPassword = true;
      } else {
        authenticated = true;
        value = response.data;
      }
    })
    .catch(function(error) {
      console.log(error);
    })

    // Clear the username and password fields
    setUsername("");
    setPassword("");

    // If the user does exist and they are authenticated
    if (authenticated) {
      // Create new authentication cookie
      const cookies = new Cookies(null, { path: '/' });
      // Update to use new cookie
      cookies.set("authenticated", {
        "value" : value
      });
      updateCookieTime();

      // If there is a redirect cookie, go to redirect link, else go to dashboard
      if (cookies.get("redirect") != undefined) {
        const redirectLink = cookies.get("redirect");
        cookies.remove("redirect");
        navigate(redirectLink);
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

