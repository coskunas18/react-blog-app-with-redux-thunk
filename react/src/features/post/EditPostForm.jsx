import { useDispatch, useSelector } from 'react-redux';

import { selectAllUsers } from '../users/usersSlice';
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function EditPostForm() {

    const { postId } = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch();

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }



    const canSave = [title, content, userId].every(Boolean) && requestStatus === "idle"

    const onSavePostCliked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending');
                dispatch(updatePost({
                    id: post.id, title, body: content, userId,
                    reactions: post.reactions
                })).unwrap();

                setTitle('');
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (error) {
                console.error('Failed to save the post', err);
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePost({
                id: post.id
            })).unwrap();

            setTitle('');
            setContent('');
            setUserId('');
            navigate('/');
        } catch (error) {
            console.log('Failed to delete the pos', error)
        } finally {
            setRequestStatus('idle')
        }
    }


    const usersOptions = users.map((user, index) => (
        <option key={index} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <div className='text-white w-full text-center'>
            <h3 className='text-5xl'>Edit Post</h3>
            <form className='flex flex-col justify-center items-center gap-4 mt-10 w-1/2 mx-auto' >
                <div className='flex flex-col justify-center items-center gap-2 w-full'>
                    <label className='text-3xl' htmlFor="">
                        Edit Title
                    </label>
                    <input type="text" id="postTitle" name="postTitle" value={title} onChange={e => setTitle(e.target.value)}
                        className='w-1/2 rounded-md bg-amber-800 p-2' />
                </div>

                <div className='flex flex-col justify-center items-center gap-2 w-full mt-2'>
                    <label className='text-3xl' htmlFor="">
                        Author
                    </label>
                    <select className='w-1/2 rounded-md bg-amber-800 p-2'
                        name="postAuthor" value={userId} onChange={e => setUserId(e.target.value)} >
                        <option value="">Select...</option>
                        {usersOptions}
                    </select>
                </div>

                <div className='flex flex-col justify-center items-center gap-2 w-full mt-2'>
                    <label htmlFor="">
                        Content
                    </label>

                    <textarea id="postContent" name="postContent" value={content} onChange={e => setContent(e.target.value)}
                        className='w-1/2 rounded-md bg-amber-800 p-2' cols="30" rows="10"></textarea>
                </div>

                <div className='mt-4 flex flex-col gap-3'>
                    <button type='button' disabled={!canSave}
                        onClick={onSavePostCliked} className="bg-amber-600 px-4 py-2 rounded-md hover:bg-amber-700">
                        Edit Post
                    </button>
                    <button type='button' className='bg-red-700 py-2 px-4 rounded-md hover:bg-red-800'>
                        Delete post
                    </button>
                </div>
            </form>
        </div>
    )
}

