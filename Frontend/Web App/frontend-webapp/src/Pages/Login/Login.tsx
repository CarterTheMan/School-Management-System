import React, { useEffect } from 'react';
import "./Login.css";
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import Cookies from 'universal-cookie';
import Cookie from 'universal-cookie';


export default function Login() {
  let params = useParams();
  let navigate = useNavigate(); 
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  // On load of login
  useEffect(() => {
    // If already authenticated, go to dashboard
    const cookies = new Cookie();
    if (cookies.get("authenticated") != undefined) {
      navigate("/dashboard");
    }
  }, []);

  // If successful login, go to redirect page or the dashboard
  const handleSubmit = async function () {
    console.log(params.id);

    // If authenticated
    if (username != '' && password != '') {
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
    }
  }

  // Navigate to create a student account page
  const handleCreateStudentAccount = async function () {
    navigate("/createStudentAccount");
  }

  return (
    <div>
      <br />
      <form className='login-form'>
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
      </form>
    </div>
  );
}