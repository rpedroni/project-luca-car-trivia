import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { carModels, shuffleArray, CarModel, getBrandById } from '../utils/carData';
import { audioService } from '../services/audioService';

interface SpeedChallengeProps {
  onBack: () => void;
}

type QuestionType = 'faster' | 'more-hp' | 'higher-top-speed';

export default function SpeedChallenge({ onBack }: SpeedChallengeProps) {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [car1, setCar1] = useState<CarModel | null>(null);
  const [car2, setCar2] = useState<CarModel | null>(null);
  const [questionType, setQuestionType] = useState<QuestionType>('faster');
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  const generateQuestion = useCallback(() => {
    const shuffled = shuffleArray([...carModels]);
    const first = shuffled[0];
    let second = shuffled[1];

    // Make sure cars have different values for the comparison
    for (let i = 1; i < shuffled.length; i++) {
      if (shuffled[i].acceleration !== first.acceleration &&
          shuffled[i].horsepower !== first.horsepower &&
          shuffled[i].topSpeed !== first.topSpeed) {
        second = shuffled[i];
        break;
      }
    }

    const types: QuestionType[] = ['faster', 'more-hp', 'higher-top-speed'];
    const type = types[Math.floor(Math.random() * types.length)];

    // Determine correct answer
    let correct: string;
    if (type === 'faster') {
      correct = first.acceleration < second.acceleration ? first.id : second.id;
    } else if (type === 'more-hp') {
      correct = first.horsepower > second.horsepower ? first.id : second.id;
    } else {
      correct = first.topSpeed > second.topSpeed ? first.id : second.id;
    }

    setCar1(first);
    setCar2(second);
    setQuestionType(type);
    setCorrectAnswer(correct);
    setSelected(null);
    setIsCorrect(null);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleSelect = useCallback((carId: string) => {
    if (selected || !correctAnswer) return;

    setSelected(carId);
    const correct = carId === correctAnswer;
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
  }, [selected, correctAnswer, streak, generateQuestion]);

  const getQuestionText = () => {
    switch (questionType) {
      case 'faster':
        return 'Which car is FASTER? (0-60 mph)';
      case 'more-hp':
        return 'Which car has MORE HORSEPOWER?';
      case 'higher-top-speed':
        return 'Which car has a HIGHER TOP SPEED?';
    }
  };

  const getStatValue = (car: CarModel) => {
    switch (questionType) {
      case 'faster':
        return `${car.acceleration}s`;
      case 'more-hp':
        return `${car.horsepower} HP`;
      case 'higher-top-speed':
        return `${car.topSpeed} mph`;
    }
  };

  if (!car1 || !car2) return null;

  const renderCarCard = (car: CarModel) => {
    const brand = getBrandById(car.brandId);
    const isSelected = selected === car.id;
    const isAnswer = car.id === correctAnswer;

    let borderColor = 'border-titanium';
    if (selected) {
      if (isAnswer) borderColor = 'border-green-500';
      else if (isSelected) borderColor = 'border-red-500';
    }

    return (
      <motion.button
        key={car.id}
        whileHover={!selected ? { scale: 1.03 } : {}}
        whileTap={!selected ? { scale: 0.97 } : {}}
        onClick={() => handleSelect(car.id)}
        disabled={!!selected}
        className={`logo-container p-4 rounded-xl border-2 ${borderColor} w-full
                   transition-all duration-200 disabled:cursor-not-allowed
                   ${isSelected && isCorrect ? 'correct-pulse glow-red' : ''}
                   ${isSelected && !isCorrect ? 'wrong-shake' : ''}`}
      >
        <div className="flex flex-col items-center">
          {brand && (
            <img
              src={brand.logoUrl}
              alt={brand.name}
              className="w-16 h-12 object-contain mb-2"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <div className="text-lg font-bold text-white mb-1">{car.name}</div>
          <div className="text-sm text-gray-400 mb-2">{brand?.name}</div>

          {selected && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-2xl font-bold font-racing mt-2 ${isAnswer ? 'text-green-400' : 'text-gray-400'}`}
            >
              {getStatValue(car)}
            </motion.div>
          )}

          {selected && isAnswer && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-2"
            >
              <span className="text-3xl">👑</span>
            </motion.div>
          )}
        </div>
      </motion.button>
    );
  };

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
      <AnimatePresence mode="wait">
        <motion.div
          key={`${car1.id}-${car2.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center mb-8"
        >
          <div className="text-4xl mb-4">⚡</div>
          <h2 className="text-xl md:text-2xl font-bold text-white font-racing">
            {getQuestionText()}
          </h2>
        </motion.div>
      </AnimatePresence>

      {/* VS Display */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="flex-1">{renderCarCard(car1)}</div>
        <div className="text-3xl font-bold text-racing-red font-racing">VS</div>
        <div className="flex-1">{renderCarCard(car2)}</div>
      </div>

      {/* Hint after selection */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-6 p-4 bg-titanium/50 rounded-xl"
        >
          <div className="text-gray-300">
            {questionType === 'faster' && '⏱️ Lower 0-60 time = Faster acceleration'}
            {questionType === 'more-hp' && '🐎 Higher HP = More power'}
            {questionType === 'higher-top-speed' && '🏁 Higher mph = Faster top speed'}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
