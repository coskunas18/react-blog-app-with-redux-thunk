import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/post/postsSlice";
import userReducer from "../features/users/usersSlice";
export default configureStore({
    reducer: {
        posts: postsReducer,
        users: userReducer,
    },
});
