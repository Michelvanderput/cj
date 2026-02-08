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
      icon: '📷',
    },
    {
      name: 'IMDb',
      url: 'https://www.imdb.com',
      icon: '🎬',
    },
    {
      name: 'Email',
      url: 'mailto:cyril@example.com',
      icon: '✉️',
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
          <span>{link.icon}</span>
          <span>{link.name}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
