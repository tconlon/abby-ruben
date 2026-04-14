import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Home } from './components/Home';
import { Schedule } from './components/Schedule';
import { Questions } from './components/Questions';
import { OurFaves } from './components/OurFaves';
import { Photos } from './components/Photos';
import { RSVP } from './components/RSVP';
import { AuthProvider, LoginPage, ProtectedRoute } from './components/Auth';
import './App.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="app">
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/schedule" element={<Schedule />} />
                            <Route path="/questions" element={<Questions />} />
                            <Route path="/our-faves" element={<OurFaves />} />
                            <Route path="/photos" element={<Photos />} />
                            <Route path="/rsvp" element={<RSVP />} />
                        </Route>
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
