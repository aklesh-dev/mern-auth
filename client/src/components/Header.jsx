import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-slate-300">
            <nav aria-label='Main navigation' className='flex justify-between max-w-6xl mx-auto items-center p-3 rounded-md'>
                <Link to='/'>
                    <h1 className="text-3xl font-bold text-gray-800">Auth App</h1>
                </Link>
                <ul className='flex space-x-4'>
                    <li><Link to='/' className="hover:text-white p-1 rounded-xl transition-all ease-in-out hover:bg-black">Home</Link></li>
                    <li><Link to='/about' className="hover:text-white p-1 rounded-xl transition-all ease-in-out hover:bg-black">About</Link></li>
                    <li><Link to='/sign-in' className="hover:text-white p-1 rounded-xl transition-all ease-in-out hover:bg-black">Sign In</Link></li>                   
                </ul>
            </nav>
        </header>
    )
}

export default Header;