import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks';

const Footer = () => {
  return (
    <footer className="border-t border-brd mt-24 md:mt-32">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/img/logo.svg"
                alt="Cyril Jansen logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="font-heading text-h4 text-brand-main tracking-wide">
                Cyril Jansen
              </span>
            </Link>
            <p className="text-body-sm text-tx-muted max-w-xs">
              Foley Artist, Sound Designer & Recording Engineer based in Amsterdam.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-h6 uppercase text-tx-muted font-body font-medium">Navigation</h4>
            <ul className="space-y-2">
              {[
                { to: '/work', label: 'Work' },
                { to: '/studio', label: 'Studio' },
                { to: '/projects', label: 'Projects' },
                { to: '/bio', label: 'Bio' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-body-sm text-tx-secondary hover:text-brand-main transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h4 className="text-h6 uppercase text-tx-muted font-body font-medium">Connect</h4>
            <SocialLinks size="sm" variant="vertical" />
          </div>
        </div>

        <div className="pt-8 border-t border-brd flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-caption text-tx-muted">
            &copy; {new Date().getFullYear()} Cyril Jansen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
