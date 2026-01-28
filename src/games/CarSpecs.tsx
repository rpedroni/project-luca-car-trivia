import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { carModels, getRandomModels, shuffleArray, CarModel, getBrandById } from '../utils/carData';
import { audioService } from '../services/audioService';

interface CarSpecsProps {
  onBack: () => void;
}

export default function CarSpecs({ onBack }: CarSpecsProps) {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentCar, setCurrentCar] = useState<CarModel | null>(null);
  const [options, setOptions] = useState<CarModel[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateQuestion = useCallback(() => {
    const correct = carModels[Math.floor(Math.random() * carModels.length)];
    const wrongOptions = getRandomModels(3, [correct.id]);
    const allOptions = shuffleArray([correct, ...wrongOptions]);

    setCurrentCar(correct);
    setOptions(allOptions);
    setSelected(null);
    setIsCorrect(null);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleSelect = useCallback((carId: string) => {
    if (selected) return;

    setSelected(carId);
    const correct = carId === currentCar?.id;
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

    setTimeout(generateQuestion, 2000);
  }, [selected, currentCar, streak, generateQuestion]);

  if (!currentCar) return null;

  const brand = getBrandById(currentCar.brandId);

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
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl text-gray-300 mb-4">
          Which car has these specs?
        </h2>

        {/* Specs Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCar.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="logo-container mx-auto p-6 mb-6"
          >
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-carbon/50 p-3 rounded-lg">
                <div className="text-gray-400 text-sm">Horsepower</div>
                <div className="text-2xl font-bold text-racing-red font-racing">
                  {currentCar.horsepower} HP
                </div>
              </div>
              <div className="bg-carbon/50 p-3 rounded-lg">
                <div className="text-gray-400 text-sm">0-60 mph</div>
                <div className="text-2xl font-bold text-racing-yellow font-racing">
                  {currentCar.acceleration}s
                </div>
              </div>
              <div className="bg-carbon/50 p-3 rounded-lg">
                <div className="text-gray-400 text-sm">Top Speed</div>
                <div className="text-2xl font-bold text-mclaren-orange font-racing">
                  {currentCar.topSpeed} mph
                </div>
              </div>
              <div className="bg-carbon/50 p-3 rounded-lg">
                <div className="text-gray-400 text-sm">Type</div>
                <div className="text-2xl font-bold text-chrome font-racing capitalize">
                  {currentCar.type}
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="text-gray-400 text-sm">Starting at </span>
              <span className="text-green-400 font-bold">{currentCar.price}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {options.map((car) => {
          const isSelected = selected === car.id;
          const isAnswer = car.id === currentCar.id;
          const carBrand = getBrandById(car.brandId);

          let bgColor = 'metallic-btn';
          if (selected) {
            if (isAnswer) bgColor = 'bg-green-600';
            else if (isSelected) bgColor = 'bg-red-600';
          }

          return (
            <motion.button
              key={car.id}
              whileHover={!selected ? { scale: 1.02 } : {}}
              whileTap={!selected ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(car.id)}
              disabled={!!selected}
              className={`${bgColor} p-4 rounded-xl text-white
                         transition-all duration-200 disabled:cursor-not-allowed
                         ${isSelected && isCorrect ? 'correct-pulse' : ''}
                         ${isSelected && !isCorrect ? 'wrong-shake' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {carBrand && (
                    <img
                      src={carBrand.logoUrl}
                      alt={carBrand.name}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className="text-left">
                    <div className="font-bold text-lg">{car.fullName}</div>
                    <div className="text-sm text-white/60">{car.year}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selected && isAnswer && <span className="text-2xl">✓</span>}
                  {selected && isSelected && !isAnswer && <span className="text-2xl">✗</span>}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
