import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoMatch from './games/LogoMatch';
import BrandGuess from './games/BrandGuess';
import CarSpecs from './games/CarSpecs';
import SpeedChallenge from './games/SpeedChallenge';
import { audioService } from './services/audioService';

type Screen = 'home' | 'game-select' | 'logo-match' | 'brand-guess' | 'car-specs' | 'speed-challenge';

function App() {
  const [screen, setScreen] = useState<Screen>('home');

  const handleBack = useCallback(() => {
    audioService.cancel();
    setScreen('game-select');
  }, []);

  const handleStart = useCallback(() => {
    audioService.speak("Let's go, Luca!");
    setScreen('game-select');
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              🏎️
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-racing metallic-text">
              Luca's Car Trivia
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Sports Cars & Supercars Edition
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-8 py-4 bg-racing-red text-white text-2xl font-bold rounded-xl
                         shadow-lg glow-red transition-all duration-300
                         hover:bg-red-600 font-racing"
            >
              START ENGINE
            </motion.button>
          </motion.div>
        )}

        {screen === 'game-select' && (
          <motion.div
            key="game-select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 font-racing">
              Choose Your Race
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GameCard
                emoji="🏁"
                title="Logo Match"
                description="Identify car brands by their logos"
                color="bg-ferrari-red"
                onClick={() => setScreen('logo-match')}
              />
              <GameCard
                emoji="🚗"
                title="Brand Guess"
                description="Match the brand name to its logo"
                color="bg-lambo-yellow"
                onClick={() => setScreen('brand-guess')}
              />
              <GameCard
                emoji="📊"
                title="Car Specs"
                description="Guess the car from its specifications"
                color="bg-mclaren-orange"
                onClick={() => setScreen('car-specs')}
              />
              <GameCard
                emoji="⚡"
                title="Speed Challenge"
                description="Which car is faster? 0-60 times!"
                color="bg-porsche-red"
                onClick={() => setScreen('speed-challenge')}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setScreen('home')}
              className="mt-8 w-full py-3 metallic-btn text-white rounded-xl font-semibold"
            >
              ← Back to Home
            </motion.button>
          </motion.div>
        )}

        {screen === 'logo-match' && (
          <LogoMatch key="logo-match" onBack={handleBack} />
        )}

        {screen === 'brand-guess' && (
          <BrandGuess key="brand-guess" onBack={handleBack} />
        )}

        {screen === 'car-specs' && (
          <CarSpecs key="car-specs" onBack={handleBack} />
        )}

        {screen === 'speed-challenge' && (
          <SpeedChallenge key="speed-challenge" onBack={handleBack} />
        )}
      </AnimatePresence>
    </div>
  );
}

interface GameCardProps {
  emoji: string;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

function GameCard({ emoji, title, description, color, onClick }: GameCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`${color} p-6 rounded-2xl text-left transition-all duration-300
                  shadow-lg hover:shadow-xl`}
    >
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="text-xl font-bold text-white mb-2 font-racing">{title}</h3>
      <p className="text-white/80 text-sm">{description}</p>
    </motion.button>
  );
}

export default App;
