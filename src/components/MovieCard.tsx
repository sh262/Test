import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface MovieCardProps {
  id: number;
  title: string;
  persianTitle: string;
  posterUrl: string;
  year: number;
  rating?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, persianTitle, posterUrl, year, rating }) => {
  return (
    <motion.div
      className="movie-card"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/movie/${id}`}>
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img 
            src={posterUrl} 
            alt={title} 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-bold">{persianTitle}</h3>
            <p className="text-sm opacity-80">{title}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm">{year}</span>
              {rating && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm">{rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;