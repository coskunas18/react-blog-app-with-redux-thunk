import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

export default function PostsExcerpt({ postId }) {

    const post = useSelector(state => selectPostById(state, postId));

    return (
        <div className="border-2 border-white p-3 mt-10 rounded-md text-white italic">
            <h3 className="text-2xl">{post.title}</h3>
            <p className="whitespace-normal">{post.body.substring(0, 75)}...</p>
            <div className="flex flex-col text-right mt-4 opacity-80">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </div>
            <div className="my-2 text-blue-300">
                <Link to={`post/${post.id}`}>View Post</Link>
            </div>

            <ReactionButtons post={post} />
        </div>
    )
}
