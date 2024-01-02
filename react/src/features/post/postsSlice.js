import { createSlice, nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import {sub} from "date-fns"
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
    posts:[],
    status:'idle',
    error:null
};


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL)
        console.log(response.data)
        return [...response.data]


    } catch (error) {
        error.message
    }

})


export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try {
        const response = await axios.post(POSTS_URL,initialPost)
        return response.data
    } catch (error) {
        return error.message
    }
})

export const PostSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                //postAdded tetiklendiğinde bu kısım çalışır, nasıl değişkecek?
                state.posts.push(action.payload);
            },
            prepare(title, content,userId) {
                //veri buradah hazırlanır
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date:new Date().toISOString(),
                        userId,
                        reactions:{
                            thumbsUp:0,
                            wow:0,
                            heart:0,
                            rocket:0,
                            coffee:0
                        }
                    },
                };
            },
        },
        reactionAdded(state,action){
            const {postId,reaction} = action.payload; //payloada reactionAdded({ postId: post.id,reaction: name}) örnek olarak böyle bir değer gelicke
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder){ //asenkron işlemler için extraReducer kullanıyoruz.
        builder.addCase(fetchPosts.pending,(state,action) => {//fetchPosts bekleme durumunda iken...
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled,(state,action) =>{//fetchPosts işlemi yüklendiğinde
            state.status = 'succeeded'
            let min ="1";
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(),{minutes:min++}).toISOString();
                post.reactions = {
                    thumbsUp:0,
                    wow:0,
                    heart:0,
                    rocket:0,
                    coffee:0
                }
                return post;
            })

            state.posts = state.posts.concat(loadedPosts)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(addNewPost.fulfilled,(state,action) => {
            action.payload.userId = Number(action.payload.userId)
            action.payload.date = new Date().toISOString();
            action.payload.reactions = {
                thumbsUp:0,
                wow:0,
                heart:0,
                rocket:0,
                coffee:0
            }
            console.log(action.payload)
            state.posts.push(action.payload)
        })
    }
});

export const selecAllPosts = (state) => state.posts.posts; //useSelector kullanırken direkt olarak selectAllPosts çağırılacak
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded,reactionAdded} = PostSlice.actions;
export default PostSlice.reducer;
