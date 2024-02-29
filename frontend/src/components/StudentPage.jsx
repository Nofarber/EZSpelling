
import PDF from "../components/PDF";


import { composeDiary, savePDF, updateStudent } from "../utils/AuthService"
import { useState, useEffect } from "react"
import emailjs from '@emailjs/browser';
import Axios from "axios";


function StudentPage() {

    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])
    const [load, setLoad] = useState(true)
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const [question, setQuestion] = useState(0)
    const [answerObj, setAnswerObj] = useState(
        currentUser.answers || {
            firstname: '',
            lastname: '',
            claSs: '',
            volenteeringPlace: '',
            volenteeringSum: '',
            volenteeringGood: '',
            volenteeringbad: '',
            whatILearned: '',
            whatIContributed: '',
            finalText: ''
        })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get('http://localhost:8000/api/data');
                setStudents(response.data.students)
                setTeachers(response.data.teachers)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    const sendEmail = () => {
        let studentsName = ''
        let teachersUsername = ''
        let teachersEmail = ''
        const userID = '9dbcnd7fJaVzTJIx8';
        const templateID = 'template_ij7a3c7';

        students.map((student) => {
            if (student._id === JSON.parse(localStorage.getItem('currentUser'))._id) {
                studentsName = student.studentName
                console.log(student)
                teachers.map((teacher) => {
                    if (teacher._id === student.teacher) {
                        teachersUsername = teacher.username
                        teachersEmail = teacher.email
                        console.log(teacher)
                    }
                })
            }
        })
        const templateParams = {
            studentName: studentsName,
            teacherUsername: teachersUsername,
            teacherEmail: teachersEmail
        };

        emailjs.send('service_f917x0d', templateID, templateParams, userID)
            .then((response) => {
                console.log('Email sent:', response.status, response.text);
            }, (error) => {
                console.error('Error sending email:', error);
            });
    };

    const createTxt = async (isRegen) => {
        try {
            if (question === 6) {
                if (!currentUser.answers?.finalText || isRegen) {
                    setLoad(true)
                    const ans = await composeDiary(answerObj)
                    console.log(ans);
                    setAnswerObj({ ...answerObj, finalText: ans.data.data })
                }
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoad(false)
        }
    }
    useEffect(() => { createTxt(false) }, [question])



    const handleSubmit = async () => {
        console.log(currentUser);
        const updatedUser = { ...currentUser, answers: answerObj }
        delete updatedUser.pdfFile
        console.log(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser))
        const res = await updateStudent(updatedUser)
        console.log(res)
        sendEmail();
    }



    return (
        <>
            <div>
                <div>{question === 0 && <div>
                    <h1 style={{ color: "white" }}>שם פרטי</h1>
                    <input defaultValue={answerObj.firstname} type="text" onChange={(e) => setAnswerObj({ ...answerObj, firstname: e.target.value })} />
                    <h1 style={{ color: "white" }}>שם משפחה</h1>
                    <input defaultValue={answerObj.lastname} type="text" onChange={(e) => setAnswerObj({ ...answerObj, lastname: e.target.value })} />
                    <h1 style={{ color: "white" }}>כיתה</h1>
                    <input defaultValue={answerObj.claSs} type="text" onChange={(e) => setAnswerObj({ ...answerObj, class: e.target.value })} />
                </div>}
                    {question === 1 && <div>
                        <h1 style={{ color: "white" }}>מקום התנדבות</h1>
                        <input defaultValue={answerObj.volenteeringPlace} type="text" onChange={(e) => setAnswerObj({ ...answerObj, volenteeringPlace: e.target.value })} />
                        <h1 style={{ color: "white" }}>?מה עשית בהתנדבות</h1>
                        <input defaultValue={answerObj.volenteeringSum} type="text" onChange={(e) => setAnswerObj({ ...answerObj, volenteeringSum: e.target.value })} />
                    </div>}
                    {question === 2 && <div>
                        <h1 style={{ color: "white" }}>דבר שהיה טוב בהתנדבות</h1>
                        <input defaultValue={answerObj.volenteeringGood} type="text" onChange={(e) => setAnswerObj({ ...answerObj, volenteeringGood: e.target.value })} />
                    </div>}
                    {question === 3 && <div>
                        <h1 style={{ color: "white" }}>דבר שהיה רע בהתנדבות</h1>
                        <input defaultValue={answerObj.volenteeringbad} type="text" onChange={(e) => setAnswerObj({ ...answerObj, volenteeringbad: e.target.value })} />
                    </div>}
                    {question === 4 && <div>
                        <h1 style={{ color: "white" }}>משהו חדש שלמדתי בהתנדבות</h1>
                        <input defaultValue={answerObj.whatILearned} type="text" onChange={(e) => setAnswerObj({ ...answerObj, whatILearned: e.target.value })} />
                    </div>}
                    {question === 5 && <div>
                        <h1 style={{ color: "white" }}>במה ההתנדבות שלי עזרה לחברה</h1>
                        <input defaultValue={answerObj.whatIContributed} type="text" onChange={(e) => setAnswerObj({ ...answerObj, whatIContributed: e.target.value })} />
                    </div>}
                    {question === 6 && <div>
                        {load ? <div>
                            <img src="https://media.tenor.com/BINsHS7Uo-0AAAAi/temple-loader.gif" width="120" height="120" />
                        </div> : <div >
                            <h1 style={{ color: "white" }}>ערוך טקסט</h1>
                            <div>
                                <button onClick={() => createTxt(true)}>צור מחדש</button>
                            </div>
                            <textarea style={{ width: "400px" }} defaultValue={answerObj.finalText} type="text" onChange={(e) => setAnswerObj({ ...answerObj, finalText: e.target.value })} />
                            <PDF info={answerObj} style={{ width: "700px" }} />
                        </div>}
                    </div>}
                </div>
                <button onClick={() => question <= 5 ? setQuestion(question + 1) : handleSubmit(false)}>{question < 6 ? "הבא" : "סיים"}</button>
                {question > 0 && <button onClick={() => setQuestion(question - 1)}>הקודם</button>}

            </div>
        </>
    )
}

export default StudentPage