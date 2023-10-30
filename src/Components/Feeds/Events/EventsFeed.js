import { useContext } from "react";
import DataContext from "../../../DataContext";
import EventsFeedItem from "./EventsFeedItem";
import { Link } from "react-router-dom";

function EventsFeed() {
    const { events } = useContext(DataContext);
 
    return (
        <main className="main-section">
                      <section className="feed-section">
                Events feed
                <br />
                <div>
                    <Link to="/events/create" style={{ textDecoration: "none" }}>
                        <div className="post-title">ADD NEW EVENT</div>
                    </Link>
                </div>
                <div className="post-feed">
                    <table>
                        <thead>
                            <tr className="table-row">
                                <th className="table-cell table-header">Name</th>
                                <th className="table-cell table-header">Description</th>
                                <th className="table-cell table-header">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, index) => (
                                <EventsFeedItem key={index} event={event} index={index} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default EventsFeed;
