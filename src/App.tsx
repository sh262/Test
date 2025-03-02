import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';
import { useWelcomeStore } from './store/welcomeStore';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import WelcomeScreen from './components/WelcomeScreen';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import SettingsPage from './pages/SettingsPage';
import LikedMoviesPage from './pages/LikedMoviesPage';

function App() {
  const { isDarkMode } = useThemeStore();
  const { hasSeenWelcome } = useWelcomeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      {!hasSeenWelcome && <WelcomeScreen />}
      
      <div className="min-h-screen bg-background text-textColor">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/liked" element={<LikedMoviesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;