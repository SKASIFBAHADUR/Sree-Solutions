import Navbar from './Navbar';
import Footer from './Footer';
import ChatPopup from '../ChatPopup';

const Layout = ({ children, currentPath }) => {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans text-secondary-900">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            {currentPath === '/' && <ChatPopup />}
            <Footer />
        </div>
    );
};

export default Layout;
