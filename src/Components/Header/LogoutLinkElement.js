import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../DataContext";

function LogoutLinkElement() {
    // const { loggedUser } = useContext(DataContext);
    
    return (
        <Link
            to={`/logout`}
            style={{ textDecoration: "none" }}
        >
            <div class="header-link">Logout</div>
        </Link>
    );
}

export default LogoutLinkElement;
