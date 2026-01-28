import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { carBrands, getRandomBrands, shuffleArray, CarBrand } from '../utils/carData';
import { audioService } from '../services/audioService';

interface LogoMatchProps {
  onBack: () => void;
}

export default function LogoMatch({ onBack }: LogoMatchProps) {
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
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-racing">
          Which brand is this?
        </h2>

        {/* Logo Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBrand.id}
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ duration: 0.3 }}
            className="logo-container mx-auto w-64 h-48 flex items-center justify-center mb-6"
          >
            <img
              src={currentBrand.logoUrl}
              alt="Car Logo"
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text y="50" font-size="40">🚗</text></svg>';
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((brand) => {
          const isSelected = selected === brand.id;
          const isAnswer = brand.id === currentBrand.id;

          let bgColor = 'metallic-btn';
          if (selected) {
            if (isAnswer) bgColor = 'bg-green-600';
            else if (isSelected) bgColor = 'bg-red-600';
          }

          return (
            <motion.button
              key={brand.id}
              whileHover={!selected ? { scale: 1.02 } : {}}
              whileTap={!selected ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(brand.id)}
              disabled={!!selected}
              className={`${bgColor} p-4 rounded-xl text-white font-semibold text-lg
                         transition-all duration-200 disabled:cursor-not-allowed
                         ${isSelected && isCorrect ? 'correct-pulse' : ''}
                         ${isSelected && !isCorrect ? 'wrong-shake' : ''}`}
            >
              <span className="flex items-center justify-center gap-2">
                {selected && isAnswer && <span>✓</span>}
                {selected && isSelected && !isAnswer && <span>✗</span>}
                {brand.name}
              </span>
              <span className="text-xs text-white/60 block mt-1">{brand.country}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
