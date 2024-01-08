import PostsList from "./features/post/postsList"
import AddPostForm from "./features/post/AddPostForm"
import { Navigate, Route, Routes } from "react-router-dom"
import SinglePostPage from "./features/post/SinglePostPage";
import EditPostForm from "./features/post/EditPostForm";
import Layout from "./components/Layout";
import UserList from "./features/users/UserList";
import UserPage from "./features/users/UserPage";

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

                    <Route path="user">
                        <Route index element={<UserList />} />
                        <Route path=":userId" element={<UserPage />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />

                </Route>
            </Routes>
        </div>
    )
}
