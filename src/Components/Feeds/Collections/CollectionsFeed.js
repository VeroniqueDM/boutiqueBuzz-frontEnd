import { useContext } from "react";
import DataContext from "../../../DataContext";
import ColletionsFeedItem from "./CollectionsFeedItem";
import { Link } from "react-router-dom";
function CollectionsFeed() {
    const { collections } = useContext(DataContext);
 
    return (
        <main className="main-section">
             <section class="feed-section">
             Collections feed
             <br />
             <div>
             <Link
            to={`/collections/create`}
            style={{ textDecoration: "none" }}
            
        >
            <div class="post-title">  ADD NEW COLLECTION</div>
        </Link>
             </div>
             <div class="post-feed">
            {collections.map((collection, index) => {
                // const user = findById(designers, designer.userId);
                return (
                    <ColletionsFeedItem
                        key={index}
                        collection={collection}
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

export default CollectionsFeed;
