import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../DataContext";

function EventsLinkElement() {
    // const { loggedUser } = useContext(DataContext);

    return (
        <Link to={`/events`} style={{ textDecoration: "none" }}>
            <div class="header-link">EVENTS</div>
        </Link>
    );
}

export default EventsLinkElement;
