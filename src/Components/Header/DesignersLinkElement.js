import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../DataContext";

function DesignersLinkElement() {
    // const { loggedUser } = useContext(DataContext);

    return (
        <Link to={`/designers`} style={{ textDecoration: "none" }}>
            <div class="header-link">Designers</div>
        </Link>
    );
}

export default DesignersLinkElement;
