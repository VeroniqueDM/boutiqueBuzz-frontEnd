import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../DataContext";

function HomeLinkElement() {
    // const { loggedUser } = useContext(DataContext);

    return (
        <Link to={`/`} style={{ textDecoration: "none" }}>
            <div class="header-link">HOME</div>
        </Link>
    );
}

export default HomeLinkElement;
