import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { carBrands, getRandomBrands, shuffleArray, CarBrand } from '../utils/carData';
import { audioService } from '../services/audioService';

interface BrandGuessProps {
  onBack: () => void;
}

export default function BrandGuess({ onBack }: BrandGuessProps) {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentBrand, setCurrentBrand] = useState<CarBrand | null>(null);
  const [options, setOptions] = useState<CarBrand[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateQuestion = useCallback(() => {
    const correct = carBrands[Math.floor(Math.random() * carBrands.length)];
    const wrongOptions = getRandomBrands(3, [correct.id]);
    const allOptions = shuffleArray([correct, ...wrongOptions]);

    setCurrentBrand(correct);
    setOptions(allOptions);
    setSelected(null);
    setIsCorrect(null);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleSelect = useCallback((brandId: string) => {
    if (selected) return;

    setSelected(brandId);
    const correct = brandId === currentBrand?.id;
    setIsCorrect(correct);

    if (correct) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      audioService.speakCorrect();

      if ((streak + 1) % 5 === 0 && streak > 0) {
        setTimeout(() => audioService.speakCelebration(), 500);
      }
    } else {
      setStreak(0);
      audioService.speakWrong();
    }

    setTimeout(generateQuestion, 1500);
  }, [selected, currentBrand, streak, generateQuestion]);

  if (!currentBrand) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="px-4 py-2 metallic-btn rounded-lg text-white"
        >
          ← Back
        </motion.button>
        <div className="flex items-center gap-4">
          {streak >= 3 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 bg-racing-yellow/20 px-3 py-1 rounded-full"
            >
              <span className="text-racing-yellow">🔥</span>
              <span className="text-racing-yellow font-bold">{streak}</span>
            </motion.div>
          )}
          <div className="bg-titanium px-4 py-2 rounded-xl">
            <span className="text-chrome font-racing">Score: </span>
            <span className="text-white font-bold text-xl">{score}</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl text-gray-300 mb-2">
          Find the logo for:
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBrand.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col items-center"
          >
            <h1
              className="text-4xl md:text-5xl font-bold font-racing mb-2"
              style={{ color: currentBrand.primaryColor }}
            >
              {currentBrand.name}
            </h1>
            <p className="text-gray-400 flex items-center gap-2">
              <span className="text-2xl">
                {currentBrand.country === 'Italy' && '🇮🇹'}
                {currentBrand.country === 'Germany' && '🇩🇪'}
                {currentBrand.country === 'United Kingdom' && '🇬🇧'}
                {currentBrand.country === 'France' && '🇫🇷'}
                {currentBrand.country === 'Sweden' && '🇸🇪'}
                {currentBrand.country === 'United States' && '🇺🇸'}
                {currentBrand.country === 'Japan' && '🇯🇵'}
              </span>
              {currentBrand.country}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Logo Options */}
      <div className="grid grid-cols-2 gap-4">
        {options.map((brand) => {
          const isSelected = selected === brand.id;
          const isAnswer = brand.id === currentBrand.id;

          let borderColor = 'border-titanium';
          if (selected) {
            if (isAnswer) borderColor = 'border-green-500';
            else if (isSelected) borderColor = 'border-red-500';
          }

          return (
            <motion.button
              key={brand.id}
              whileHover={!selected ? { scale: 1.03 } : {}}
              whileTap={!selected ? { scale: 0.97 } : {}}
              onClick={() => handleSelect(brand.id)}
              disabled={!!selected}
              className={`logo-container p-6 rounded-xl border-2 ${borderColor}
                         transition-all duration-200 disabled:cursor-not-allowed
                         ${isSelected && isCorrect ? 'correct-pulse glow-red' : ''}
                         ${isSelected && !isCorrect ? 'wrong-shake' : ''}
                         ${selected && isAnswer ? 'glow-red' : ''}`}
            >
              <div className="relative">
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="w-full h-24 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text y="50" font-size="40">🚗</text></svg>';
                  }}
                />
                {selected && isAnswer && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                  >
                    <span className="text-white text-xl">✓</span>
                  </motion.div>
                )}
                {selected && isSelected && !isAnswer && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                  >
                    <span className="text-white text-xl">✗</span>
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
