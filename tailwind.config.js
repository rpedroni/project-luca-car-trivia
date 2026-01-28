/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        'racing-red': '#E10600',
        'racing-yellow': '#FFD700',
        'carbon': '#1a1a1a',
        'titanium': '#2d2d2d',
        'chrome': '#C0C0C0',
        'ferrari-red': '#DC0000',
        'lambo-yellow': '#DDB321',
        'porsche-red': '#C8102E',
        'mclaren-orange': '#FF8700',
      },
      fontFamily: {
        'racing': ['Orbitron', 'sans-serif'],
        'display': ['Nunito', 'sans-serif'],
      },
      animation: {
        'engine-rev': 'engineRev 0.5s ease-in-out infinite',
        'shine': 'shine 2s linear infinite',
        'drift': 'drift 3s ease-in-out infinite',
        'speedometer': 'speedometer 1s ease-out',
      },
      keyframes: {
        engineRev: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateX(10px) rotate(2deg)' },
          '75%': { transform: 'translateX(-10px) rotate(-2deg)' },
        },
        speedometer: {
          '0%': { transform: 'rotate(-90deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      backgroundImage: {
        'racing-gradient': 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        'carbon-fiber': 'repeating-linear-gradient(45deg, #1a1a1a, #1a1a1a 2px, #2a2a2a 2px, #2a2a2a 4px)',
      },
    },
  },
  plugins: [],
}
