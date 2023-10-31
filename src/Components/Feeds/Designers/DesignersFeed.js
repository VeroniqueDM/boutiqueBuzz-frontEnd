import { useContext } from "react";
import DataContext from "../../../DataContext";
import DesignersFeedItem from "./DesignersFeedItem";
import { Link } from "react-router-dom";

function DesignersFeed() {
    const { designers } = useContext(DataContext);

    return (
        <main className="main-section">
            <section class="feed-section">
                {/* <FeedSectionHeader />
                {(!(posts && posts.length) || !users || !comments) && <Loader />}
                <FeedSectionBody /> */}
                Designers Feed
                <br />
                <div>
                    <Link
                        to={`/designers/create`}
                        style={{ textDecoration: "none" }}
                    >
                        <div class="post-title"> ADD NEW DESIGNER</div>
                    </Link>
                </div>
                <div class="post-feed">
                    {designers.map((designer, index) => {
                        // const user = findById(designers, designer.userId);
                        return (
                            <DesignersFeedItem
                                key={index}
                                designer={designer}
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

export default DesignersFeed;
