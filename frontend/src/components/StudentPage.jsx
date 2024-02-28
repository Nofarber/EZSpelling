import { useState, useEffect } from "react"
import { composeDiary, updateStudent } from "../utils/AuthService"
import emailjs from '@emailjs/browser';
import Axios from "axios";


function StudentPage() {

    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const [question, setQuestion] = useState(0)
    const [answerObj, setAnswerObj] = useState({
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

    const createTxt = async () => {
        if (question === 6) {
            const ans = await composeDiary(answerObj)
            console.log(ans);
            setAnswerObj({ ...answerObj, finalText: ans.data.data })
        }
    }
    useEffect(() => { createTxt() }, [question])



    const handleSubmit = async () => {
        console.log(currentUser);
        const updatedUser = { ...currentUser, answers: answerObj }
        console.log(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser))
        const res = await updateStudent(updatedUser)
        console.log(res)
        sendEmail();
    }



    return (
        <>
            <div>
                <h1>תלמיד</h1>
                <div>{question === 0 && <div>
                    <h1>שם פרטי</h1>
                    <input defaultValue={answerObj.firstname} type="text" onChange={(e) => setAnswerObj({ ...answerObj, firstname: e.target.value })} />
                    <h1>שם משפחה</h1>
                    <input defaultValue={answerObj.lastname} type="text" onChange={(e) => setAnswerObj({ ...answerObj, lastname: e.target.value })} />
                    <h1>כיתה</h1>
                    <input defaultValue={answerObj.claSs} type="text" onChange={(e) => setAnswerObj({ ...answerObj, class: e.target.value })} />
                </div>}
                    {question === 1 && <div>
                        <h1>מקום התנדבות</h1>
                        <input defaultValue={answerObj.volenteeringPlace} type="text" onChange={(e) => setAnswerObj({ ...answerObj, volenteeringPlace: e.target.value })} />
                        <h1>?מה עשית בהתנדבות</h1>
                        <input defaultValue={answerObj.volenteeringSum} type="text" onChange={(e) => setAnswerObj({ ...answerObj, volenteeringSum: e.target.value })} />
                    </div>}
                    {question === 2 && <div>
                        <h1>דבר שהיה טוב בהתנדבות</h1>
                        <input defaultValue={answerObj.volenteeringGood} type="text" onChange={(e) => setAnswerObj({ ...answerObj, volenteeringGood: e.target.value })} />
                    </div>}
                    {question === 3 && <div>
                        <h1>דבר שהיה רע בהתנדבות</h1>
                        <input defaultValue={answerObj.volenteeringbad} type="text" onChange={(e) => setAnswerObj({ ...answerObj, volenteeringbad: e.target.value })} />
                    </div>}
                    {question === 4 && <div>
                        <h1>משהו חדש שלמדתי בהתנדבות</h1>
                        <input defaultValue={answerObj.whatILearned} type="text" onChange={(e) => setAnswerObj({ ...answerObj, whatILearned: e.target.value })} />
                    </div>}
                    {question === 5 && <div>
                        <h1>במה ההתנדבות שלי עזרה לחברה</h1>
                        <input defaultValue={answerObj.whatIContributed} type="text" onChange={(e) => setAnswerObj({ ...answerObj, whatIContributed: e.target.value })} />
                    </div>}
                    {question === 6 && <div>
                        <h1>ערוך טקסט</h1>
                        <textarea defaultValue={answerObj.finalText} type="text" onChange={(e) => setAnswerObj({ ...answerObj, finalText: e.target.value })} />
                    </div>}
                </div>
                <button onClick={() => question <= 6 ? setQuestion(question + 1) : handleSubmit()}>{question < 6 ? "הבא" : "סיים"}</button>
                {question > 0 && <button onClick={() => setQuestion(question - 1)}>הקודם</button>}
                <button onClick={() => console.log(answerObj)}>log</button>
                <button onClick={sendEmail}>Send Email</button>
            </div>
        </>
    )
}

export default StudentPage