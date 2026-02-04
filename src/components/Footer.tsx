import SocialLinks from './SocialLinks';

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Cyril Jansen. All rights reserved.
          </p>
          <SocialLinks size="sm" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
