import { useContext } from "react";
import DataContext from "../../../DataContext";
import NewsFeedItem from "./NewsFeedItem";
import { Link } from "react-router-dom";

function NewsFeed() {
    const { news } = useContext(DataContext);
 
    return (
        <main className="main-section">
             <section class="feed-section">
             News Feed
            
             <br />
             <div>
             <Link
            to={`/news/create`}
            style={{ textDecoration: "none" }}
            
        >
            <div class="post-title">  ADD NEW ARTICLE</div>
        </Link>
             </div>
              
                <div class="post-feed">
            {news.map((newsItem, index) => {
                return (
                    <NewsFeedItem
                        key={index}
                        newsItem={newsItem}
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

export default NewsFeed;
