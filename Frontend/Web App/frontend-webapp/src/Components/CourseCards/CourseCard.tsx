import "./CourseCard.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface props {
    title: String,
    description: String,
    id: number
}

export default function CourseCard({title, description, id} : props) {
    let navigate = useNavigate(); 
    
    const openClass = () => {
		const link = "/course/" + id;
		navigate(link);
	}

    return (
        <div className="card-padding" onClick={() => openClass()}>
            <Card style={{ maxWidth: '19vw', height: "100%"}}>
                <CardActionArea style={{width: '100%', height: '100%'}}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/public/logo192.png"
                        alt="Class Logo"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {/* If there is a description */}
                            {(description != "") && 
                                description
                            }
                            
                            {/* If there isn't a description */}
                            {!(description == "") && 
                                ""
                            }
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}