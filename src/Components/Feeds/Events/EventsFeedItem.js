import { Link } from "react-router-dom";

function EventsFeedItem(props) {
    const { event, index } = props;

    const formattedEventDate = new Date(event.eventDate).toLocaleDateString();


    return (
        <div class="post">
            <div class="post-content">
            <Link
            to={`/events/${event.id}`}
            style={{ textDecoration: "none" }}
            
        >
            <div class="post-title">  Name: {event.title}</div>
        </Link>
              
                Description: {event.description}
                Date: {formattedEventDate}
            </div>
        </div>
    );
}

export default EventsFeedItem;
