import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕',
}

export default function ReactionButtons({ post }) {

    const dispatch = useDispatch();

    const ReactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        //bir nesneyi, key valueye sahip bir diziye dönüştürdük.
        return (
            <button
                key={name}
                type="button"
                className="mx-1"
                onClick={() => dispatch(reactionAdded({
                    postId: post.id,
                    reaction: name
                }))}
            >
                {emoji}{post.reactions[name]}
            </button>
        )
    })

    return (
        <div>{ReactionButtons}</div>
    )
}

