import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../DataContext";

function FashionItemsLinkElement() {
    // const { loggedUser } = useContext(DataContext);

    return (
        <Link to={`/items`} style={{ textDecoration: "none" }}>
            <div class="header-link">ITEMS</div>
        </Link>
    );
}

export default FashionItemsLinkElement;
