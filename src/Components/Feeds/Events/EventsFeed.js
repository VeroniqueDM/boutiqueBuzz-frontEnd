import { useContext } from "react";
import DataContext from "../../../DataContext";
import EventsFeedItem from "./EventsFeedItem";
import { Link } from "react-router-dom";

function EventsFeed() {
    const { events } = useContext(DataContext);
 
    return (
        <main className="main-section">
             <section class="feed-section">
             Events feed
             <br />
             <div>
             <Link
            to={`/events/create`}
            style={{ textDecoration: "none" }}
            
        >
            <div class="post-title">  ADD NEW EVENT</div>
        </Link>
             </div>
             <div class="post-feed">
            {events.map((event, index) => {
                // const user = findById(designers, designer.userId);
                return (
                    <EventsFeedItem
                        key={index}
                        event={event}
                        index={index}
                        // author={user}
                    />
                );
            })} 
        </div> 
            </section>
        </main>
    );
}

export default EventsFeed;
