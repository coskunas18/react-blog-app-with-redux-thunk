import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { Link, useParams } from "react-router-dom";
export default function SinglePostPagek() {

    const { postId } = useParams()
    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <div className="border-2 border-white p-3 mt-10 rounded-md text-white italic">
            <div className="flex justify-between">
                <h3 className="text-2xl">{post.title}</h3>
                <div>
                    <Link to={`post/edit/${post.id}`} className="text-red-200" >
                        Edit Post
                    </Link>
                </div>

            </div>

            <p className="whitespace-normal">{post.body.substring(0, 100)}</p>
            <div className="flex flex-col text-right mt-4 opacity-80">

                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </div>
            <ReactionButtons post={post} />
        </div>
    )
}
