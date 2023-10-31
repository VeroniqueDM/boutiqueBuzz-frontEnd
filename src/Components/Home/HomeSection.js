import { useContext } from "react";
import DataContext from "../../DataContext";
import NewsFeed from "../Feeds/News/NewsFeed";
import EventsFeed from "../Feeds/Events/EventsFeed";

function HomeSection() {
    // const { posts, users, comments } = useContext(DataContext);

    return (
        <main className="main-section">
            <div className="home-container">
                <h1 className="home-heading">
                    Welcome to Our Unique Design Platform
                </h1>
                <p className="home-subheading">
                    Design is unique - created with a special personal touch,
                    just for one client, so as to reveal his individual
                    character. Emphasis on personalization, along with unique
                    design and uncompromising craftsmanship, as well as staying
                    true to the idea of ​​harmonious aesthetics and beauty.
                </p>
                <div className="image-container center">
                <img
                    src="https://content.app-sources.com/s/43025754122018032/thumbnails/640x480/Images/7-6371305.svg?format=webp"
                    alt="Unique Design"
                    className="home-image"
                />
                </div>
            </div>
        </main>
    );
}

export default HomeSection;

{
    /* <section class="feed-section">
<FeedSectionHeader />
{(!(posts && posts.length) || !users || !comments) && <Loader />}
<FeedSectionBody />
<NewsFeed/>
<br />
<EventsFeed/>
<br />
</section> */
}
