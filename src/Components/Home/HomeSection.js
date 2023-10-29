import { useContext } from "react";
import DataContext from "../../DataContext";
import NewsFeed from "../Feeds/News/NewsFeed";
import EventsFeed from "../Feeds/Events/EventsFeed";

function HomeSection() {
    // const { posts, users, comments } = useContext(DataContext);
 
    return (
        <main className="main-section">
            <section class="feed-section">
                {/* <FeedSectionHeader />
                {(!(posts && posts.length) || !users || !comments) && <Loader />}
                <FeedSectionBody /> */}
                <NewsFeed/>
                <br />
                <EventsFeed/>
                <br />
            </section>
        </main>
    );
}

export default HomeSection;
