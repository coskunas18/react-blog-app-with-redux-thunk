import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersSlice'
import { selectPostsByUser } from '../post/postsSlice'
import { Link, useParams } from 'react-router-dom'

const UserPage = () => {
    const { userId } = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)))

    const postsForUser = useSelector(state => selectPostsByUser(state, Number(userId)))

    const postTitles = postsForUser.map(post => (
        <li className="hover:text-gray-400" key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section className="flex flex-col justify-center items-center gap-3">
            <h2 className="text-4xl text-white">{user?.name}</h2>

            <ul className="list-disc text-white">{postTitles}</ul>
        </section>
    )
}

export default UserPage
