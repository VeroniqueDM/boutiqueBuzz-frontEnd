import { useContext } from "react";
import DataContext from "../../../DataContext";
import ItemsFeedItem from "./ItemsFeedItem";
import { Link } from "react-router-dom";

function ItemsFeed() {
    const { items } = useContext(DataContext);

    return (
        <main className="main-section">
            <section className="feed-section">
                Items feed
                <br />
                <div>
                    <Link to="/items/create" style={{ textDecoration: "none" }}>
                        <div className="post-title">ADD NEW ITEM</div>
                    </Link>
                </div>
                <div className="post-feed">
                    <table>
                        <thead>
                            <tr className="table-row">
                                <th className="table-cell table-header">Name</th>
                                <th className="table-cell table-header">Description</th>
                                <th className="table-cell table-header">Designer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <ItemsFeedItem key={index} item={item} index={index} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default ItemsFeed;
