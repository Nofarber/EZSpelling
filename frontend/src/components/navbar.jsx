import { useNavigate } from "react-router-dom";

function Navbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('currentUser', JSON.stringify(null));
    localStorage.setItem("token", JSON.stringify(null));
    navigate('/');
  };

  return (
    <div style={{
      position: "fixed",
      top: "0px",
      right: "0px",
      left: "0px",
      backgroundImage: "linear-gradient(to bottom, #070F2B, #1B1A55)",
      color: "white",
      paddingTop: "20px",
      paddingBottom: "20px",
      height: "50px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px", // Adjust padding as needed
      boxSizing: "border-box", // Ensure padding is included in width
      direction: "rtl", // Set direction to right-to-left
    }}>
  
      {currentUser ? (
        <div style={{ flex: 1, textAlign: "left" }}>
          <strong style={{flex: 2,textAlign: "right"}}>שלום {currentUser.username}</strong>
          <button onClick={handleLogout} style={{marginRight: "60px" }}>התנתק</button>
        </div>
      ) : null}
    </div>
  );
}

export default Navbar;
