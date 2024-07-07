import React from 'react';
import "./Login.css";
import { useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';


export default function Login() {
  let params = useParams();
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleSubmit = async function () {
    console.log(params.id);
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
          type="button"
          onClick={handleSubmit}
          sx={{ ml: 4, mr: 4, mb: 4 }}
        >
          Login
        </Button>

        

      </form>
      {/* <h1>This is the login page for user: {params.id}</h1> */}
    </div>
  );
}