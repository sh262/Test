import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useWelcomeStore } from '../store/welcomeStore';
import { welcomeSlides } from '../data/movies';

const WelcomeScreen: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setHasSeenWelcome } = useWelcomeStore();

  const nextSlide = () => {
    if (currentSlide < welcomeSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setHasSeenWelcome(true);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skipWelcome = () => {
    setHasSeenWelcome(true);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <div className="welcome-screen">
      <AnimatePresence initial={false} custom={1}>
        <motion.div
          key={currentSlide}
          custom={1}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="welcome-slide"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${welcomeSlides[currentSlide].imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center text-white max-w-md"
          >
            <h1 className="text-3xl font-bold mb-4">{welcomeSlides[currentSlide].title}</h1>
            <p className="text-lg mb-8">{welcomeSlides[currentSlide].description}</p>
            
            <div className="flex justify-center space-x-2 space-x-reverse mb-8">
              {welcomeSlides.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? 'bg-primary' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              {currentSlide > 0 ? (
                <button
                  onClick={prevSlide}
                  className="flex items-center text-white"
                >
                  <ChevronRight className="w-5 h-5 ml-1" />
                  قبلی
                </button>
              ) : (
                <div></div>
              )}
              
              {currentSlide < welcomeSlides.length - 1 ? (
                <button
                  onClick={nextSlide}
                  className="flex items-center text-white"
                >
                  بعدی
                  <ChevronLeft className="w-5 h-5 mr-1" />
                </button>
              ) : (
                <button
                  onClick={skipWelcome}
                  className="btn-primary"
                >
                  شروع کنید
                </button>
              )}
            </div>
            
            {currentSlide < welcomeSlides.length - 1 && (
              <button
                onClick={skipWelcome}
                className="mt-8 text-gray-400 hover:text-white transition-colors"
              >
                رد کردن
              </button>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WelcomeScreen;