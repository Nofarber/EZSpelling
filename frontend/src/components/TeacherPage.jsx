import { useEffect } from "react"
import { getAllStudents, newStudents, updateStudent } from "../utils/AuthService"
import { useState } from "react"
import { Button } from "@mui/base"

function TeacherPage() {
    const currentTeacher = JSON.parse(localStorage.getItem("currentUser"))
    const [allStudents, setAllStudents] = useState([])
    const [editing, setEditing] = useState(10000000)
    const [currentStudent, setCurrentStudent] = useState(null)
    const [showAddField, setShowAddField] = useState([])

    useEffect(() => {

        console.log(currentTeacher);
        initialGetStudents()
    }, [])

    const initialGetStudents = async () => {
        const ff = await getAllStudents(currentTeacher)
        setAllStudents(ff.data.data)
        console.log(ff.data.data);
    }

    const handleChange = (e, i) => {
        const studentName = e
        const username = e.replaceAll(" ", "")
        const password = username + '123'
        const newStudent = { studentName, username, password, teacherId: currentTeacher._id }
        const tempArray = showAddField;
        if (e) {
            tempArray[i] = newStudent;
            setShowAddField([...tempArray])
            console.log(tempArray);
        } else {
            tempArray.pop()
            setShowAddField([...tempArray])
            console.log(tempArray);
        }
    }
    const createStudents = () => {
        showAddField.forEach(async (v) => {
            const newS = await newStudents(v)
            console.log(newS);
        })
    }

    return (<>
        <h1>מורה</h1>
        <div>
            <div>
                {showAddField.map((v, i) =>
                    <div key={i}>
                        <input autoFocus type="text" placeholder="שם התלמיד (באנגלית)" onChange={(e) => handleChange(e.target.value, i)} />
                    </div>
                )}
                <button onClick={() => (showAddField[showAddField.length - 1] || showAddField.length === 0) && setShowAddField([...showAddField, null])}>הוסף תלמידים</button>
                {showAddField[showAddField.length - 1] && <button onClick={() => createStudents()}>צור</button>}
            </div>
            {
                allStudents.map((v, i) =>
                    <div key={i} onClick={() => { setEditing(i), setCurrentStudent(v) }} >
                        <strong>{v.studentName}</strong>
                        <strong>{v.answers ? "בוצע" : "לא בוצע"}</strong>
                        {editing === i && <div>
                            {v.answers?.finalText && <div>
                                <textarea defaultValue={v.answers?.finalText} onChange={(e) => setCurrentStudent({ ...currentStudent, answers: { ...currentStudent.answers, finalText: e.target.value } })}></textarea>
                            <button onClick={async () => {
                                const res = await updateStudent(currentStudent)
                                setCurrentStudent(res.data.data)
                                console.log(res);
                            }}>שמור</button>
                            </div>}
                            <button onClick={() => console.log(currentTeacher)}>log</button>
                        </div>}
                    </div>)
            }

        </div>

    </>
    )
}

export default TeacherPage