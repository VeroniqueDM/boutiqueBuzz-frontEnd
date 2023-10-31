import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../DataContext";

function CollectionsLinkElement() {
    // const { loggedUser } = useContext(DataContext);

    return (
        <Link to={`/collections`} style={{ textDecoration: "none" }}>
            <div class="header-link">Collections</div>
        </Link>
    );
}

export default CollectionsLinkElement;
