import { useNavigate } from "react-router-dom";

function Navbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const navigate = useNavigate()

  const handleLogout=()=>{
    localStorage.setItem('currentUser',JSON.stringify(null))
    localStorage.setItem("token", JSON.stringify(null));
    navigate('/')
  }
  return (
    <>
      <div style={{position:"absolute", top:"0px",right:"0px",width:"100vw",backgroundColor:"#1B1A55", color:"white", paddingTop:"20px",paddingBottom:"20px", height:"50px"}}>{currentUser ? <div>
        <button onClick={()=>handleLogout()}>התנתק</button>
        <strong>{`${currentUser.username} שלום`}</strong>
      </div> : <div>
        <strong>EZspelling ברוך הבא ל </strong>
      </div>
      }
      </div>
    </>
  );
}

export default Navbar;
