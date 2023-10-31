import React, { useContext, useState } from "react";
import DataContext from "../../../DataContext";
import NewsFeedItem from "./NewsFeedItem";
import { Link } from "react-router-dom";

function NewsFeed() {
    const { news } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState("");
    const filteredNews = news.filter((newsItem) => {
        const title = newsItem.title.toLowerCase();
        return title.includes(searchTerm.toLowerCase());
    });

  
    return (
        <main className="main-section">
            <section className="feed-section">
                <h2 className="section-heading">News Feed</h2>
                <br />
                <div>
                    <Link to="/news/create" style={{ textDecoration: "none" }}>
                        <div className="post-title">ADD NEW ARTICLE</div>
                    </Link>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Search news..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="post-feed">
                    <table>
                        <thead>
                            <tr className="table-row">
                                <th className="table-cell table-header">
                                    Name
                                </th>
                                <th className="table-cell table-header">
                                    Content
                                </th>
                                <th className="table-cell table-header">
                                    Date Published
                                </th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {news.map((newsItem, index) => (
                                <NewsFeedItem key={index} newsItem={newsItem} index={index} />
                            ))}
                        </tbody> */}
                        <tbody>
                            {/* Use filteredNews instead of news */}
                            {filteredNews.map((newsItem, index) => (
                                <NewsFeedItem
                                    key={index}
                                    newsItem={newsItem}
                                    index={index}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default NewsFeed;
