import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-200">
      <nav className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-light tracking-tight hover:opacity-60 transition-opacity">
            Cyril Jansen
          </Link>
          
          <ul className="flex items-center gap-8">
            <li>
              <Link 
                to="/projects" 
                className={`text-sm tracking-wide transition-opacity ${
                  isActive('/projects') ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                }`}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`text-sm tracking-wide transition-opacity ${
                  isActive('/about') ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`text-sm tracking-wide transition-opacity ${
                  isActive('/contact') ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
