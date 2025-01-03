import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../assets/LogoutIcon";

export function Logout() {
    const navigate = useNavigate();
    function logout() {
        console.log('logging out');
        localStorage.removeItem('token');
        navigate('/signin');
    }
    return <button onClick={logout} className="ml-5 mr-auto p-2">
        <LogoutIcon />
    </button>
}