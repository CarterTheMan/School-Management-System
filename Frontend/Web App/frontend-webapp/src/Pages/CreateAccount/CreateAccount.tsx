import React from 'react';
import "./CreateAccount.css";
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import Cookies from 'universal-cookie';

interface props {
    type: string
}

export default function CreateAccount({type} : props) {
  let params = useParams();
  let navigate = useNavigate(); 
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');



  // If successful account creation, go to redirect page or the dashboard
  const handleSubmit = async function () {

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

  return (
    <div>
      <br />
      <form className='CreateAccount-form'>
      <TextField
          type="text"
          label="First Name"
          onChange={e => setFirstName(e.target.value)}
          required
          value={firstName}
          sx={{ mt: 4, ml: 4, mr: 4, display: 'inline-flex' }}
        />
        <TextField
          type="text"
          label="Last Name"
          onChange={e => setLastName(e.target.value)}
          required
          value={lastName}
          sx={{ mt: 4, ml: 4, mr: 4, display: 'inline-flex' }}
        />
        <br />
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
          Create account
        </Button>
      </form>
    </div>
  );
}