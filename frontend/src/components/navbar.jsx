import { useNavigate } from "react-router-dom";

function Navbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("currentUser", JSON.stringify(null));
    localStorage.setItem("token", JSON.stringify(null));
    navigate("/");
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        backgroundImage: "linear-gradient(to bottom, #070F2B, #1B1A55)",
        color: "white",
        padding: "10px 20px", // Add padding for better spacing
        boxSizing: "border-box", // Ensure padding is included in width
        direction: "rtl",
        width: "100%",
        height:"12vh"
      }}
    >
      {currentUser ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <h2 style={{ fontWeight: "normal" }}>שלום {currentUser.username}</h2>
          <button onClick={handleLogout}>התנתק</button>
        </div>
      ) : null}
    </div>
  );
}

export default Navbar;
