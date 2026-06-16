import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <p className="text-2xl font-bold text-gradient">Resume AI Checker</p>
      </Link>

      <Link 
        to="/upload" 
        className="primary-button w-fit px-6 py-3 hover:opacity-90 transition-all duration-200 hover:shadow-lg flex items-center gap-2"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9m-5-9v8m0 0l-3-3m3 3l3-3" 
          />
        </svg>
        Upload Resume
      </Link>
    </nav>
  )
}

export default Navbar