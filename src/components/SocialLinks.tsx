import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faImdb } from '@fortawesome/free-brands-svg-icons';

interface SocialLinksProps {
  variant?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

const SocialLinks = ({ variant = 'horizontal', size = 'md' }: SocialLinksProps) => {
  const sizeClasses = {
    sm: 'text-body-sm',
    md: 'text-body',
    lg: 'text-body-lg',
  };

  const containerClasses = variant === 'horizontal' 
    ? 'flex items-center gap-6' 
    : 'flex flex-col gap-3';

  const links = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com',
      icon: faInstagram,
    },
    {
      name: 'IMDb',
      url: 'https://www.imdb.com',
      icon: faImdb,
    },
    {
      name: 'Email',
      url: 'mailto:cyril@example.com',
      icon: faEnvelope,
    },
  ];

  return (
    <div className={containerClasses}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target={link.name !== 'Email' ? '_blank' : undefined}
          rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
          className={`${sizeClasses[size]} text-tx-secondary hover:text-brand-main transition-colors duration-200 flex items-center gap-2`}
        >
          <FontAwesomeIcon icon={link.icon} className="text-base w-4" />
          <span>{link.name}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
