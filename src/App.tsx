import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Login from './components/Login.tsx';
import Instructions from './components/Instructions.tsx';
import VideoEssay from './components/VideoEssay.tsx';
import ThankYou from './components/ThankYou.tsx';

function App() {
  return (
    <Router >
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/video-essay" element={<VideoEssay />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;