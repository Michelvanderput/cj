import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';

const Home = lazy(() => import('./pages/Home'));
const Work = lazy(() => import('./pages/Work'));
const Studio = lazy(() => import('./pages/Studio'));
const Projects = lazy(() => import('./pages/Projects'));
const Bio = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Admin = lazy(() => import('./pages/Admin'));

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
          <Route path="work" element={<Suspense fallback={<PageLoader />}><Work /></Suspense>} />
          <Route path="studio" element={<Suspense fallback={<PageLoader />}><Studio /></Suspense>} />
          <Route path="projects" element={<Suspense fallback={<PageLoader />}><Projects /></Suspense>} />
          <Route path="bio" element={<Suspense fallback={<PageLoader />}><Bio /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
          <Route path="admin" element={<Suspense fallback={<PageLoader />}><Admin /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
