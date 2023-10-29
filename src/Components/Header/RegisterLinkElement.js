import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../DataContext";

function RegisterLinkElement() {
    // const { loggedUser } = useContext(DataContext);
    
    return (
        <Link
            to={`/register`}
            style={{ textDecoration: "none" }}
        >
            <div class="header-link">Register</div>
        </Link>
    );
}

export default RegisterLinkElement;
