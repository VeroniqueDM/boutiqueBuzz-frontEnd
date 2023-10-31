import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../DataContext";

function LogoutLinkElement({ handleLogout }) {
    // const { loggedUser } = useContext(DataContext);

    return (
        //         <Link
        //             to={`/logout`}
        //             style={{ textDecoration: "none" }}
        //         >
        //             <div class="header-link"             onClick={handleLogout} // Call the handleLogout function on click
        // >Logout</div>
        //         </Link>
        <button onClick={handleLogout} className="header-link">
            Logout
        </button>
    );
}

export default LogoutLinkElement;
