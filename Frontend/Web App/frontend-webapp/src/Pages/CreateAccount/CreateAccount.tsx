import React from 'react';
import "./CreateAccount.css";
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { baseLink } from '../../General/Authentication';

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
    let authenticated : boolean = false;
    let id : number = 0;

    // Create the user 
    await axios.post(baseLink + '/register-' + type, {
      "firstname": firstName,
      "lastname": lastName,
      "username" : username, 
      "password" : password
    })
    .then(function(response) {
      if (response.status == 200) {
        id = parseInt(response.data.id);
        authenticated = true;
      }
    })
    .catch(function(error) {
      console.log(error);
    })

    // If authenticated
    if (authenticated) {
      // Create new authentication cookie
      const cookies = new Cookies(null, { path: '/' });
      // TODO: Update to use new cookie
      cookies.set("authenticated", {
        "userType" : type,
        "id" : id,
        "username" : username
      });

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
      <h1 style={{textAlign: "center"}}>Create a {type} account</h1>
      <div className='CreateAccount-form'>
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
      </div>
    </div>
  );
}