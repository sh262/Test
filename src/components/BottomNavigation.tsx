import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Film, Settings, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLikedMoviesStore } from '../store/likedMoviesStore';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { likedMovies } = useLikedMoviesStore();

  return (
    <div className="bottom-nav py-2 px-4">
      <div className="flex justify-around items-center">
        <Link to="/" className="flex flex-col items-center">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${
              location.pathname === '/' 
                ? 'bg-primary text-white' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Home className="w-5 h-5" />
          </motion.div>
          <span className="text-xs mt-1">خانه</span>
        </Link>

        <Link to="/liked" className="flex flex-col items-center">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${
              location.pathname === '/liked' 
                ? 'bg-primary text-white' 
                : 'text-gray-500 dark:text-gray-400'
            } relative`}
          >
            <Heart className="w-5 h-5" />
            {likedMovies.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {likedMovies.length}
              </span>
            )}
          </motion.div>
          <span className="text-xs mt-1">علاقه‌مندی‌ها</span>
        </Link>

        <Link to="/settings" className="flex flex-col items-center">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${
              location.pathname === '/settings' 
                ? 'bg-primary text-white' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Settings className="w-5 h-5" />
          </motion.div>
          <span className="text-xs mt-1">تنظیمات</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;