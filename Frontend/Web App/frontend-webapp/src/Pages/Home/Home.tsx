import "./Home.css";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import SideBar from "../../Components/SideBar/SideBar";

export default function Home() {
  let navigate = useNavigate(); 

  // Go to the login page
  const handleLogin = async function () {
    navigate("/login");
  }

  return (
    <div>
      <h1>This is the home page</h1>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={handleLogin}
        sx={{ ml: 4, mr: 4, mb: 4 }}
        >
          Login
        </Button>
        <SideBar />
    </div>
  );
}