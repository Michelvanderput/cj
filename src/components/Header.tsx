import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/work', label: 'Work' },
  { to: '/studio', label: 'Studio' },
  { to: '/projects', label: 'Projects' },
  { to: '/bio', label: 'Bio' },
  { to: '/contact', label: 'Contact' },
];

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-bg/85 backdrop-blur-md border-b border-brd">
      <nav className="section-container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 168 388" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-auto transition-transform duration-200 group-hover:scale-105"
            >
              <path d="M65.7147 112.354V151.533L130.062 179.926V323.524L102.399 351.187H47.6704V388H117.11L167.167 337.946V155.799L65.7147 112.354Z" fill="#FFD6AC"/>
              <path d="M102.598 101.891V51.299C102.598 23.0112 79.5838 0 51.299 0C23.0141 0 0 23.0112 0 51.299V225.411C0 253.696 23.0112 276.71 51.299 276.71C79.5867 276.71 102.598 253.699 102.598 225.411V193.974L65.8461 178.097L65.8373 183.643C65.8373 183.964 65.7876 215.813 65.7876 225.624C65.7876 233.519 59.3658 239.941 51.4714 239.941C43.577 239.941 37.1551 233.519 37.1551 225.624V51.074C37.1551 43.1855 43.5653 36.7694 51.4451 36.7694C59.3248 36.7694 65.735 43.1855 65.735 51.074V86.9202L102.604 101.891H102.598Z" fill="#FFD6AC"/>
              <circle 
                cx="146.771" 
                cy="102.426" 
                r="18.474" 
                fill="#E94243"
                className="transition-all duration-300 group-hover:animate-pulse"
              />
            </svg>
            <span className="font-heading text-h4 text-brand-main tracking-wide hidden sm:inline">
              Cyril Jansen
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`relative text-body-sm font-medium tracking-wide transition-colors duration-200 pb-1 ${
                    isActive(to)
                      ? 'text-brand-main'
                      : 'text-tx-secondary hover:text-tx-primary'
                  }`}
                >
                  {label}
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 ${
                    isActive(to) ? 'bg-brand-secondary w-full' : 'bg-transparent w-0'
                  }`} />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block w-6 h-0.5 bg-tx-primary transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-tx-primary transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-tx-primary transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <ul id="mobile-menu" className="md:hidden mt-4 pb-2 flex flex-col gap-1 border-t border-brd pt-4">
            {navItems.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 px-2 rounded-md text-body font-medium transition-colors duration-200 ${
                    isActive(to)
                      ? 'text-brand-main bg-surface-elevated'
                      : 'text-tx-secondary hover:text-tx-primary hover:bg-surface-elevated'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
