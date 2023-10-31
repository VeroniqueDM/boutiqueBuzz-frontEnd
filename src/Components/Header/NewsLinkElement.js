import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../DataContext";

function NewsLinkElement() {
    // const { loggedUser } = useContext(DataContext);

    return (
        <Link to={`/news`} style={{ textDecoration: "none" }}>
            <div class="header-link">NEWS</div>
        </Link>
    );
}

export default NewsLinkElement;
