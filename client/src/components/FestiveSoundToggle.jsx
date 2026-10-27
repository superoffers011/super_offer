import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

// Web Audio API Synthesizer for Festive Sounds (Zero external MP3 dependencies)
class FestiveAudioEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  }

  // Melodic Temple Chime
  playChime() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, High C
      freqs.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.1);

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + index * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + index * 0.1 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + index * 0.1);
        osc.stop(this.ctx.currentTime + index * 0.1 + 0.9);
      });
    } catch (e) {
      // Audio not permitted or user interaction needed
    }
  }

  // Celebratory Cracker Blast / Sparkler Celebration
  playCrackerBlast() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      // White noise buffer for firecracker sizzle & pop
      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(this.ctx.currentTime);
      noise.stop(this.ctx.currentTime + 0.5);

      // Add a celebratory high bell right after
      setTimeout(() => this.playChime(), 150);
    } catch (e) {
      // Ignore
    }
  }
}

export const festiveAudio = new FestiveAudioEngine();

export const FestiveSoundToggle = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      festiveAudio.playChime();
    }
  };

  return (
    <button
      onClick={toggleSound}
      title={soundEnabled ? 'Mute Festive Audio' : 'Play Festive Diwali Chimes'}
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all duration-300 shadow-lg border ${
        soundEnabled
          ? 'bg-festive-royalRed/90 text-festive-goldGlow border-festive-gold shadow-gold-glow scale-105'
          : 'bg-festive-deepMaroon/80 text-festive-goldLight/70 border-festive-gold/30 hover:border-festive-gold hover:text-festive-gold'
      }`}
    >
      {soundEnabled ? (
        <>
          <Volume2 className="w-4 h-4 text-festive-gold animate-bounce" />
          <span className="hidden sm:inline">Diwali Audio: ON</span>
          <Sparkles className="w-3.5 h-3.5 text-festive-goldGlow" />
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-slate-400" />
          <span className="hidden sm:inline">Diwali Audio</span>
        </>
      )}
    </button>
  );
};

export default FestiveSoundToggle;
