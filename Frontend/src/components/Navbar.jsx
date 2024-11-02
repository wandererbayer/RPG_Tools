import {Link} from 'react-router-dom'

export default function Navbar() {
    return (
        <>
            <nav className="navbar w-full h-24 bg-yellow-600 flex items-center justify-around">
                <Link to='/' className='text-sky-950 font-bold text-3xl'>RPG Tools</Link>
                <Link to='/players' className='text-sky-950 text-2xl'>Players</Link>
                <Link to='/enemies' className='text-sky-950 text-2xl'>Enemies</Link>
                <Link to='/tracker' className='text-sky-950 text-2xl'>Tracker</Link>
            </nav>
        </>
    )
}