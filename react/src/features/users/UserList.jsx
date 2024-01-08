
import { useSelector } from "react-redux"
import { selectAllUsers } from "./usersSlice"
import { Link } from "react-router-dom"

export default function UserList() {

    const users = useSelector(selectAllUsers);

    const renderedUsers = users.map((user, index) => (
        <li className="hover:text-gray-400" key={index}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ))

    return (
        <section className="flex flex-col justify-center items-center gap-3">
            <p className="text-4xl text-white">Users</p>
            <ul className="list-disc text-white">{renderedUsers}</ul>
        </section>
    )
}
