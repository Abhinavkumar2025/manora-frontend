import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import LostAndFound from './pages/Lost_And_Found/Lost_And_Found';
import Footer from './components/Footer/Footer';
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import OAuthSuccess from "./pages/OAuthSuccess/OAuthSuccess";
import PageTransition from './components/PageTransition/PageTransition';
import { GalleryProvider } from './context/GalleryContext';
import Gallery from './pages/Manora/Gallery/Gallery';
import Upload from './pages/Manora/Gallery/Upload';
import AlbumView from './pages/Manora/Gallery/AlbumView';
import CreateAlbumForm from './components/Manora/Gallery/CreateAlbumForm';

function App() {
  const location = useLocation();

  return (
    <GalleryProvider>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/oauth-success" element={<PageTransition><OAuthSuccess /></PageTransition>} />
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/lost-and-found" element={<PageTransition><ProtectedRoute><LostAndFound /></ProtectedRoute></PageTransition>} />
          <Route path="/manora/gallery" element={<PageTransition><ProtectedRoute><Gallery /></ProtectedRoute></PageTransition>} />
          <Route path="/manora/gallery/create" element={<PageTransition><ProtectedRoute><CreateAlbumForm /></ProtectedRoute></PageTransition>} />
          <Route path="/manora/gallery/:id" element={<PageTransition><ProtectedRoute><AlbumView /></ProtectedRoute></PageTransition>} />
          <Route path="/manora/gallery/:id/upload" element={<PageTransition><ProtectedRoute><Upload /></ProtectedRoute></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </GalleryProvider>
  );
}

export default App;
