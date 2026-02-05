import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface-bg">
      <Header />
      <main className="flex-1 pt-24 md:pt-28">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
