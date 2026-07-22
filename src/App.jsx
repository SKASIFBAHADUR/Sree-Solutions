import { useState, useEffect } from 'react'
import Layout from './components/layout/Layout'
import { lazy, Suspense } from 'react';

import Home from './pages/Home';

const StudyAbroad = lazy(() => import('./pages/StudyAbroad'));
const ToursAndTravels = lazy(() => import('./pages/ToursAndTravels'));
const DigitalMarketing = lazy(() => import('./pages/DigitalMarketing'));
const GovernmentServices = lazy(() => import('./pages/GovernmentServices'));
const DynamicServicePage = lazy(() => import('./components/DynamicServicePage'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Contact = lazy(() => import('./pages/Contact'));
const Insurance = lazy(() => import('./pages/Insurance'));
const SreeSeva = lazy(() => import('./pages/sree-seva'));
const MediGenie = lazy(() => import('./pages/MediGenie'));
const Recruitment = lazy(() => import('./pages/Recruitment'));
const Admin = lazy(() => import('./pages/Admin'));



function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0); // Ensure page starts at top on navigation
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Check for dynamic service routes
  let Component;

  if (currentPath.startsWith('/services/')) {
    const serviceSlug = currentPath.replace('/services/', '');
    if (serviceSlug === 'study-abroad') {
      Component = StudyAbroad;
    } else if (serviceSlug === 'tours-and-travels') {
      Component = ToursAndTravels;
    } else if (serviceSlug === 'digital-marketing') {
      Component = DigitalMarketing;
    } else if (serviceSlug === 'insurance') {
      Component = Insurance;
    } else if (serviceSlug === 'sree-seva') {
      Component = SreeSeva;
    } else if (serviceSlug === 'medical-assistant') {
      Component = MediGenie;
    } else if (serviceSlug === 'epfo') {
      Component = GovernmentServices;
    } else {
      Component = () => <DynamicServicePage serviceSlug={serviceSlug} />;
    }
  } else {
    switch (currentPath) {
      case '/':
        Component = Home;
        break;
      case '/study-abroad':
        Component = StudyAbroad;
        break;
      case '/tours-and-travels':
      case '/tour-and-travels':
        Component = ToursAndTravels;
        break;
      case '/about-us':
        Component = AboutUs;
        break;
      case '/insurance':
        Component = Insurance;
        break;
      case '/services':
        // Showing Gov services as an example for the general services route or similar
        Component = GovernmentServices;

        break;
      case '/contact':
        Component = Contact;
        break;
      case '/recruitment':
        Component = Recruitment;
        break;
      case '/admin':
        Component = Admin;
        break;
      default:
        Component = Home;
    }

  }

  return (
    <Layout currentPath={currentPath}>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-8 h-8 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin"></div></div>}>
        <Component />
      </Suspense>
    </Layout>
  )
}

export default App
