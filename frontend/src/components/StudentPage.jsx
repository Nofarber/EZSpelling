import { useState } from "react"
import { composeDiary, updateStudent } from "../utils/AuthService"
import { useEffect } from "react"
import PDF from "../components/PDF";



function StudentPage() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const [question, setQuestion] = useState(0)
    const [answerObj, setAnswerObj] = useState(
        currentUser.answers ||{
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
    const createTxt = async () => {
        if (question === 6) {
            if(currentUser.answers.finalText){
                const ans = await composeDiary(answerObj)
                console.log(ans);
                setAnswerObj({...answerObj,finalText:ans.data.data})
            }
        }
    }
    useEffect(()=>{createTxt()},[question])

    const handleSubmit = async ()=>{
        console.log(currentUser);
        const updatedUser = {...currentUser, answers:answerObj}
        console.log(updatedUser);
        localStorage.setItem('currentUser',JSON.stringify(updatedUser))
        const res = await updateStudent(updatedUser)
        console.log(res)
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
                        <PDF info={answerObj}/>
                    </div>}
                </div>
                <button onClick={() => question <= 6 ? setQuestion(question + 1): handleSubmit()}>{question < 6 ? "הבא" : "סיים"}</button>
                {question > 0 && <button onClick={() => setQuestion(question - 1)}>הקודם</button>}
                <button onClick={() => console.log(currentUser)}>log</button>
            </div>
        </>
    )
}

export default StudentPage