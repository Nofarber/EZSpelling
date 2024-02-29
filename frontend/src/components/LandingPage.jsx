import { useState } from "react";
import { ask } from "../utils/AuthService";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [allQnA, setAllQnA] = useState([]);

  const handleAsk = () => {
    ask(question).then((res) => setAllQnA([...allQnA, res.data]));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "5vh" }}>
        <h2 className="h2-class">EZSpelling - ברוך הבא ל</h2>
      </div>
      <div className="landingContainer" style={{ marginTop: "5vh" }}>
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", color: "#1B1A55", textAlign: "center" }}>כניסת מורה</h2>
          <button className="landingButton" onClick={() => navigate("/teacher_login")}>
            כניסה
          </button>
        </div>
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", color: "#1B1A55", textAlign: "center" }}>כניסת תלמיד</h2>
          <button className="landingButton" onClick={() => navigate("/student_login")}>
            כניסה
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
