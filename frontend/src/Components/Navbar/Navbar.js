import "./Navbar.css";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigator = useNavigate();


     const handleRemove = () => {
        localStorage.removeItem("token")
        navigator("/login");
    }

   return(
     <div className="nav-container">
        <nav className="nav-bar">
            <h1 className="logo">ThWorks</h1>
            <div>
                <button type="button" onClick={handleRemove} className="logout">Logout</button>
            </div>
        </nav>

    </div>
   )
}

export default Navbar;