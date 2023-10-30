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
                        <div class="post-title"> ADD NEW COLLECTION</div>
                    </Link>
                </div>
                <div class="post-feed">
                    <table>
                        <thead>
                            <tr className="table-row">
                                <th className="table-cell table-header">
                                    Name
                                </th>
                                <th className="table-cell table-header">
                                    Description
                                </th>
                                <th className="table-cell table-header">
                                    Designer
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {collections &&
                                collections.map((collection, index) => (
                                    <ColletionsFeedItem
                                        key={index}
                                        collection={collection}
                                        index={index}
                                        // author={user}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default CollectionsFeed;
