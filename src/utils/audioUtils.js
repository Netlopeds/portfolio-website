// Audio utility functions for the portfolio

// Create hover sound effect
export const playHoverSound = () => {
  // Create a subtle hover sound using Web Audio API
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
};

// Create Windows-style click sound effect
export const playClickSound = () => {
  // Create a Windows click sound using Web Audio API
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Windows click sound: quick descending tone
  oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.05);
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.05);
};

// Play custom audio file
export const playHuhSound = () => {
  const audio = new Audio(import.meta.env.BASE_URL + 'huhsound.mp3');
  audio.volume = 0.5; // Adjust volume as needed
  audio.play().catch(e => console.log('Audio play failed:', e));
};

// Play reset sound
export const playResetSound = () => {
  // Play the fartsound.mp3 file
  const audio = new Audio(import.meta.env.BASE_URL + 'fartsound.mp3');
  audio.volume = 0.5; // Adjust volume as needed
  audio.play().catch(e => console.log('Audio play failed:', e));
};

// Play una sound for logo hover
export const playUnaSound = () => {
  const audio = new Audio(import.meta.env.BASE_URL + 'unasound.mp3');
  audio.volume = 0.4; // Slightly lower volume for hover
  audio.play().catch(e => console.log('Audio play failed:', e));
};

// Play sound for name highlight hover
export const playNameHover = () => {
  // Create a gentle chime sound for name highlights
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Gentle chime: higher pitch, shorter duration
  oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(1400, audioContext.currentTime + 0.08);
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.08);
};
