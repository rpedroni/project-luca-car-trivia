// Audio service for text-to-speech functionality
class AudioService {
  private static instance: AudioService;
  private synth: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;
  private isReady: boolean = false;

  private constructor() {
    this.synth = window.speechSynthesis;
    this.initVoice();
  }

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  private initVoice(): void {
    const loadVoices = () => {
      const voices = this.synth.getVoices();
      // Prefer a clear English voice
      this.voice = voices.find(v => v.name.includes('Google US English')) ||
                   voices.find(v => v.name.includes('Samantha')) ||
                   voices.find(v => v.lang.startsWith('en')) ||
                   voices[0] || null;
      this.isReady = true;
    };

    if (this.synth.getVoices().length > 0) {
      loadVoices();
    } else {
      this.synth.addEventListener('voiceschanged', loadVoices);
    }
  }

  public speak(text: string, rate: number = 1.0): void {
    if (!this.isReady) {
      console.warn('Audio service not ready yet');
      return;
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) {
      utterance.voice = this.voice;
    }
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    this.synth.speak(utterance);
  }

  public speakCorrect(): void {
    const phrases = [
      'Correct!',
      'Yes!',
      'Nice!',
      'Great!',
      'Right!',
      'Perfect!',
      'Awesome!',
      'Excellent!',
    ];
    this.speak(phrases[Math.floor(Math.random() * phrases.length)]);
  }

  public speakWrong(): void {
    const phrases = [
      'Try again!',
      'Not quite!',
      'Oops!',
      'Almost!',
      'Close!',
    ];
    this.speak(phrases[Math.floor(Math.random() * phrases.length)]);
  }

  public speakCelebration(): void {
    const phrases = [
      'Amazing, Luca!',
      'You are on fire!',
      'Incredible driving knowledge!',
      'Supercar expert!',
      'Luca, the car master!',
      'Unbelievable!',
      'Racing champion!',
      'Speed demon!',
    ];
    this.speak(phrases[Math.floor(Math.random() * phrases.length)], 0.9);
  }

  public cancel(): void {
    this.synth.cancel();
  }
}

export const audioService = AudioService.getInstance();
