import React, { useContext, useState } from "react";
import DataContext from "../../../DataContext";
import EventsFeedItem from "./EventsFeedItem";
import { Link } from "react-router-dom";

function EventsFeed() {
    const { events } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState("");
    const filteredEvents = events.filter((event) => {
        const title = event.title.toLowerCase();
        const description = event.description.toLowerCase();
        return title.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase());
    });
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
                 {/* Step 2: Add an input field for search queries */}
                <div>
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
                        {filteredEvents.map((event, index) => (
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
