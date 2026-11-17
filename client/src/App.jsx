import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DonationModal from './components/DonationModal';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Education from './pages/Education';
import Gallery from './pages/Gallery';
import JoinUs from './pages/JoinUs';
import { api } from './services/api';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState('');
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    api.getPrograms().then(setPrograms).catch(() => {});
  }, []);

  const handleOpenDonate = (programId = '') => {
    setSelectedProgramId(programId);
    setDonateModalOpen(true);
  };

  const handleCloseDonate = () => {
    setDonateModalOpen(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar onOpenDonate={handleOpenDonate} />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home onOpenDonate={handleOpenDonate} />} />
            <Route path="/about" element={<About onOpenDonate={handleOpenDonate} />} />
            <Route path="/programs" element={<Programs onOpenDonate={handleOpenDonate} />} />
            <Route path="/education" element={<Education onOpenDonate={handleOpenDonate} />} />
            <Route path="/gallery" element={<Gallery onOpenDonate={handleOpenDonate} />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="*" element={<Home onOpenDonate={handleOpenDonate} />} />
          </Routes>
        </main>

        <Footer />

        <DonationModal
          isOpen={donateModalOpen}
          onClose={handleCloseDonate}
          selectedProgramId={selectedProgramId}
          programs={programs}
        />
      </div>
    </BrowserRouter>
  );
}

