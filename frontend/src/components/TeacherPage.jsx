import { useEffect } from "react"
import { getAllStudents, newStudents, savePDF, updateStudent } from "../utils/AuthService"
import { useState } from "react"
import { Button } from "@mui/base"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import MyDocument from "./MyDocument"

function TeacherPage() {
    const currentTeacher = JSON.parse(localStorage.getItem("currentUser"))
    const [allStudents, setAllStudents] = useState([])
    const [editing, setEditing] = useState(10000000)
    const [currentStudent, setCurrentStudent] = useState(null)
    const [showAddField, setShowAddField] = useState([])
    const [loadedStudents, setLoadedStudents] = useState(allStudents)
    const [showPreview, setShowPreview] = useState(false);

    const handlePreviewButtonClick = () => {
        setShowPreview(!showPreview);
    };

    useEffect(() => {

        console.log(currentTeacher);
        initialGetStudents()
    }, [])

    const initialGetStudents = async () => {
        const ff = await getAllStudents(currentTeacher)
        setAllStudents(ff.data.data)
        setLoadedStudents(ff.data.data)
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
    const handleSearch = (v) => {
        const tempArr = allStudents.filter((e) => e.studentName.includes(v))
        setLoadedStudents(tempArr)
    }

    return (<>
        <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "start", backgroundColor: "#535C91", width: "80vw", height: "100vh" }}>
            <div>
                {showAddField.map((v, i) =>
                    <div key={i}>
                        <input autoFocus type="text" placeholder="שם התלמיד (באנגלית)" onChange={(e) => handleChange(e.target.value, i)} />
                    </div>
                )}
                <button onClick={() => (showAddField[showAddField.length - 1] || showAddField.length === 0) &&
                    setShowAddField([...showAddField, null])}>הוסף תלמידים</button>
                {showAddField[showAddField.length - 1] && <button onClick={() => createStudents()}>צור</button>}
            </div>
            <input style={{ height: "3em" }} type="text" placeholder="חפש תלמיד" onChange={(e) => handleSearch(e.target.value)} />
            {
                loadedStudents.map((v, i) =>
                    <div style={{ border: "black 2px solid", width: "90%", margin: "10px", backgroundColor: "#F3F3F3", borderRadius: "10px", transition: "all 0.5s" }} key={i} onClick={() => { setEditing(i), setCurrentStudent(v) }} >
                        <h2 style={{ margin: "5px" }}>{v.studentName}</h2>
                        {v.answers ? <strong style={{ color: "green" }}>בוצע</strong> : <strong style={{ color: "red" }}>לא בוצע</strong>}
                        {editing === i && <div>
                            <strong style={{ margin: "5px" }}>{` ${v.username}123 :סיסמא`}</strong>
                            <strong style={{ margin: "5px" }}>{` ${v.username} :שם משתמש`}</strong>
                            {v.answers?.finalText && <div>
                                <textarea style={{ height: "140px", width: "80%", textAlign: "end", fontSize: "17px" }} defaultValue={v.answers?.finalText} onChange={(e) => setCurrentStudent({ ...currentStudent, answers: { ...currentStudent.answers, finalText: e.target.value } })}></textarea>
                                <br />
                                <button onClick={async () => {
                                    const temp = currentStudent
                                    delete temp.pdfFile
                                    const res = await updateStudent(temp)
                                    setCurrentStudent(res.data.data)
                                    console.log(res);
                                }}>שמור</button>
                                <button onClick={() => console.log(currentStudent)}>log</button>
                                {currentStudent && (
                                    <button
                                        style={{ marginTop: "20px" }}
                                        onClick={handlePreviewButtonClick}
                                    >
                                        {showPreview?"הסתר":"הצג מסמך"}
                                        </button>)}
                                {showPreview && (
                                    <div
                                        style={{
                                            border: "1px solid black",
                                            margin: "20px",
                                            padding: "20px",
                                        }}
                                    >
                                        <h2>PDF תצוגת</h2>
                                        <PDFViewer width="500" height="400">
                                            <MyDocument formData={currentStudent.answers} />
                                        </PDFViewer>
                                        <p></p>
                                        <PDFDownloadLink
                                            document={<MyDocument formData={currentStudent.answers} />}
                                            fileName="מחוייבות_אישית.pdf"
                                        >
                                            {({ blob, url, loading, error }) =>
                                                loading ? "...טוען" : "הורד מסמך"
                                            }
                                        </PDFDownloadLink>
                                    </div>
                                )}
                            </div>}
                        </div>}
                    </div>)
            }

        </div>

    </>
    )
}

export default TeacherPage