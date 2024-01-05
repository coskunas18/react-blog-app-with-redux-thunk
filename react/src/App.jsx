import PostsList from "./features/post/postsList"
import AddPostForm from "./features/post/AddPostForm"
import { Route, Routes } from "react-router-dom"
import SinglePostPage from "./features/post/SinglePostPage";
import EditPostForm from "./features/post/EditPostForm";
import Layout from "./components/Layout";
export default function App() {
    return (
        <div className="bg-amber-900 h-screen overflow-auto">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<PostsList />} />
                    <Route path="post/">
                        <Route index element={<AddPostForm />} />
                        <Route path=":postId" element={<SinglePostPage />} />
                        <Route path="edit/:postId" element={<EditPostForm />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}
