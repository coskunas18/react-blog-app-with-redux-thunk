import PostsList from "./features/post/postsList"
import AddPostForm from "./features/post/AddPostForm"

export default function App() {
    return (
        <div className="h-screen bg-amber-950 overflow-auto">
            <AddPostForm />
            <hr className="mt-5" />
            <PostsList/>

        </div>
    )
  }
