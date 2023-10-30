import { Link } from "react-router-dom";

function CategoriesLinkElement() {
    return (
        <Link to="/categories" style={{ textDecoration: "none" }}>
            <div className="header-link">CATEGORIES</div>
        </Link>
    );
}

export default CategoriesLinkElement;
