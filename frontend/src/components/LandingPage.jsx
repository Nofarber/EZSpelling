import { useState } from 'react'
import {ask} from '../utils/AuthService'
import {Box, Button, Container, Typography,Menu, MenuItem,Tooltip, IconButton,Avatar,Divider,ListItemIcon ,} from "@mui/material";
import Login from "./Login";
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'


const LandingPage = ()=>{

    const navigate = useNavigate()

const [question,setQuestion] = useState('')
const [allQnA,setAllQnA] = useState([])
const handleAsk = ()=>{
    ask(question).then((res) => setAllQnA([...allQnA,res.data]))
}

return(
    <>
    <div className='landingContainer'>
        <div className='card'>
            <h2>כניסת מורה</h2>
            <button className='landingButton' onClick={()=>navigate("/teacher_login")}>כניסה</button>
        </div>
        <div className='card'>
            <h2>כניסת תלמיד</h2>
            <button className='landingButton' onClick={()=>navigate("/student_login")}>כניסה</button>
        </div>
    </div>
    </>
)
}
export default LandingPage