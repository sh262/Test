import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Search, Moon, Sun, Heart, HandCoins } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useLikedMoviesStore } from '../store/likedMoviesStore';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { likedMovies } = useLikedMoviesStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const isMovieRoute = /^\/movie\/\d+$/.test(location.pathname);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? `bg-cardBg shadow-md py-2 ${isMovieRoute ? 'text-gray-600 dark:text-gray-100' : ''}`
          : `bg-transparent py-4 ${isMovieRoute ? 'text-gray-100' : ''}`
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Film className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold mr-2">سینما پلاس</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link
              to="/"
              className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/' ? 'text-primary' : ''
                }`}
            >
              خانه
            </Link>
            <Link
              to="/liked"
              className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/liked' ? 'text-primary' : ''
                } relative`}
            >
              علاقه‌مندی‌ها
              {likedMovies.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {likedMovies.length}
                </span>
              )}
            </Link>
            <Link
              to="/settings"
              className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/settings' ? 'text-primary' : ''
                }`}
            >
              تنظیمات
            </Link>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            <Link to="/liked" className="md:hidden relative">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Heart className="w-5 h-5" />
                {likedMovies.length > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {likedMovies.length}
                  </span>
                )}
              </motion.div>
            </Link>

            <Link to="https://google.com" className="relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <HandCoins className="w-5 h-5 text-primary" />
              </motion.button>
            </Link>
          </div>
        </div>

        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <input
              type="text"
              placeholder="جستجوی فیلم..."
              className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;