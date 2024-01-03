import { useSelector, useDispatch } from "react-redux";
import { selecAllPosts, getPostsError, fetchPosts, getPostsStatus } from "./postsSlice";
import { useEffect } from "react";
import PostsExcerpt from "./PostsExcerpt";


const PostList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selecAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError)


    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);





    let content;

    if (postStatus === "loading") {
        content = <p>"Loading..."</p>;
    } else if (postStatus === "succeeded") {
        const orderedPost = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

        //slice ile posts dizisinin kopyasını aldık. daha sonra sort ile en yeni ve eskiyi sıraladık. localCompare de karışlaştırdı
        content = orderedPost.map((post, index) => (
            <PostsExcerpt post={post} key={index} />
        ));
    } else if (postStatus === "failed") {
        content = <p>{error}</p>
    }



    return (
        <section>
            <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-3">
                {content}
            </div>
        </section>
    );
};

export default PostList;
