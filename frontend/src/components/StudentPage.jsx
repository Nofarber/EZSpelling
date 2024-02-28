import { useState } from "react"


function StudentPage() {
    const [question, setQuestion] = useState(0)
    const [answerObj, setAnswerObj] = useState({
        firstname: '',
        lastname: '',
        class: '',
        volenteeringPlace: '',
        volenteeringSum: '',
        volenteeringGood: '',
        volenteeringbad: '',
        whatILearned: '',
        whatIContributed: '',
        finalText: ''
    })


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
                    <input defaultValue={answerObj.class} type="text" onChange={(e) => setAnswerObj({ ...answerObj, class: e.target.value })} />
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
                </div>
                <button onClick={() => question <= 6 && setQuestion(question + 1)}>{question < 6 ? "הבא" : "סיים"}</button>
                {question > 0 && <button onClick={() => setQuestion(question - 1)}>הקודם</button>}
                <button onClick={() => console.log(answerObj)}>log</button>
            </div>
        </>
    )
}

export default StudentPage