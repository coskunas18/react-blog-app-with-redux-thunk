import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

export default function PostsExcerpt({ post }) {
    return (
        <div className="border-2 border-white p-3 mt-10 rounded-md text-white italic">
            <h3 className="text-2xl">{post.title}</h3>
            <p className="whitespace-normal">{post.body.substring(0, 100)}</p>
            <div className="flex flex-col text-right mt-4 opacity-80">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </div>
            <ReactionButtons post={post} />
        </div>
    )
}
