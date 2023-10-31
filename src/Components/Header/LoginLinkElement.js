import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../DataContext";

function LoginLinkElement() {
    // const { loggedUser } = useContext(DataContext);

    return (
        <Link to={`/login`} style={{ textDecoration: "none" }}>
            <div class="header-link">Login</div>
        </Link>
    );
}

export default LoginLinkElement;
