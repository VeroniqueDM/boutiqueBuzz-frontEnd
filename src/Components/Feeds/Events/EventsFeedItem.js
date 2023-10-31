import { Link } from "react-router-dom";

function EventsFeedItem(props) {
    const { event, index } = props;

    const formattedEventDate = new Date(event.eventDate).toLocaleDateString();

    return (
        <tr key={event.id} className="table-row">
            <td className="table-cell">
                <Link
                    to={`/events/${event.id}`}
                    style={{ textDecoration: "none" }}
                >
                    {event.title}
                </Link>
            </td>
            <td className="table-cell">{event.description}</td>
            <td className="table-cell">{formattedEventDate}</td>
        </tr>
    );
}

export default EventsFeedItem;
