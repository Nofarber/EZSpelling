import { useEffect } from "react"
import { getAllStudents } from "../utils/AuthService"

function TeacherPage() {
    const getStudents = getAllStudents
    const currentTeacher = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(async () => {
        const students = await getStudents(currentTeacher)
        console.log(students);
    },[])
    
    return(
        <h1>מורה</h1>
    )
    }
    
    export default TeacherPage