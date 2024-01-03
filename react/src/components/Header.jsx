import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="w-full h-16 gap-4 bg-amber-700 flex items-center text-yellow-500 font-bold">
            <h1 className="mx-4 text-4xl">Redux Blog</h1>
            <Link to="/">Home</Link>
            <Link to="post">Post</Link>
        </header>
    )
}
