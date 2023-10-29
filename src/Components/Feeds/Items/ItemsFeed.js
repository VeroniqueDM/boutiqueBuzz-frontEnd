import { useContext } from "react";
import DataContext from "../../../DataContext";
import ItemsFeedItem from "./ItemsFeedItem";
import { Link } from "react-router-dom";

function ItemsFeed() {
    const { items} = useContext(DataContext);
 
    return (
        <main className="main-section">
             <section class="feed-section">
             Items feed
             <br />
             <div>
             <Link
            to={`/items/create`}
            style={{ textDecoration: "none" }}
            
        >
            <div class="post-title">  ADD NEW ITEM</div>
        </Link>
             </div>
             <div class="post-feed">
            {items.map((item, index) => {
                // const user = findById(designers, designer.userId);
                return (
                    <ItemsFeedItem
                        key={index}
                        item={item}
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

export default ItemsFeed;
