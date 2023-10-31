import { Link } from "react-router-dom";

function DesignersFeedItem(props) {
    const { designer, index } = props;

    // const { } =
    //     useContext(DataContext);

    // const toggleExpanded = () => {
    //     const updatedPosts = [...posts];
    //     updatedPosts[index].expanded = !updatedPosts[index].expanded;
    //     setPosts(updatedPosts);
    // };

    // if (!author || !post) {
    //     return <Loader />;
    // }

    return (
        <div class="post">
            {/* <PostUserInfo author={author} /> */}
            <div class="post-content">
                {/* <PostTitle post={post} />
                <PostBody post={post} />
                <PostItemComments post={post} />
                <ToggleElement post={post} toggleExpanded={toggleExpanded} />
                <CommentForm
                    comments={comments[post.id] || []}
                    setComments={setComments}
                    post={post}
                    updateComment={updateComment}
                /> */}
                <Link
                    to={`/designers/${designer.id}`}
                    style={{ textDecoration: "none" }}
                >
                    <div class="post-title"> Name: {designer.name}</div>
                </Link>
                <br />
                Email: {designer.email}
                <br />
            </div>
        </div>
    );
}

export default DesignersFeedItem;
