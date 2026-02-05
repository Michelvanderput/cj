import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/projects', label: 'Projecten' },
  { to: '/about', label: 'Over' },
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
            <img
              src="/img/logo.svg"
              alt="Cyril Jansen logo"
              className="h-10 w-auto transition-transform duration-200 group-hover:scale-105"
            />
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
            aria-label={mobileOpen ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={mobileOpen}
          >
            <span className={`block w-6 h-0.5 bg-tx-primary transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-tx-primary transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-tx-primary transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <ul className="md:hidden mt-4 pb-2 flex flex-col gap-1 border-t border-brd pt-4">
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
