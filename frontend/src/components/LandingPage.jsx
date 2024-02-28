import { useState } from 'react'
import {ask} from '../utils/AuthService'
import {Box, Button, Container, Typography,Menu, MenuItem,Tooltip, IconButton,Avatar,Divider,ListItemIcon ,} from "@mui/material";
import Login from "./Login";
import { useNavigate } from 'react-router-dom';


const LandingPage = ()=>{

    const navigate = useNavigate()

const [question,setQuestion] = useState('')
const [allQnA,setAllQnA] = useState([])
const handleAsk = ()=>{
    ask(question).then((res) => setAllQnA([...allQnA,res.data]))
}

return(
    <>
    <div style={{backgroundImage:"https://atidedu.org.il/wp-content/themes/atid/assets/images/logo.png",backgroundSize:"100%",backgroundRepeat:"no-repeat",height:"100vh",width:"100vw"}}>
    <Button onClick={()=>navigate("/teacher_login")}>כניסת מורה</Button>
    <Button onClick={()=>navigate("/student_login")}>כניסת תלמיד</Button>
    </div>
    </>
)
}
export default LandingPage