/**
 * Procedural Web Audio API sound synthesizer for APEX MOTORS
 * Synthesizes authentic combustion V8 roar and futuristic electric warp propulsion
 * Zero external audio dependencies - 100% reliable, zero 404s
 */

class SupercarSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.4;
  private mode: 'v8' | 'electric' = 'v8';
  private revLevel: number = 0.2; // 0 (idle) to 1 (redline)

  // Web Audio Nodes
  private masterGain: GainNode | null = null;
  private engineGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filter: BiquadFilterNode | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      // AudioContext not supported
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getMode(): 'v8' | 'electric' {
    return this.mode;
  }

  public setMode(newMode: 'v8' | 'electric') {
    this.mode = newMode;
    if (this.isPlaying) {
      this.stop();
      this.start();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public setRev(level: number) {
    this.revLevel = Math.max(0, Math.min(1, level));
    if (!this.ctx || !this.isPlaying) return;

    const t = this.ctx.currentTime;
    if (this.mode === 'v8') {
      const baseFreq = 40 + this.revLevel * 180;
      if (this.osc1) this.osc1.frequency.setTargetAtTime(baseFreq, t, 0.08);
      if (this.osc2) this.osc2.frequency.setTargetAtTime(baseFreq * 1.5, t, 0.08);
      if (this.subOsc) this.subOsc.frequency.setTargetAtTime(baseFreq * 0.5, t, 0.08);
      if (this.filter) this.filter.frequency.setTargetAtTime(150 + this.revLevel * 2400, t, 0.08);
    } else {
      // Electric warp sound
      const baseFreq = 180 + this.revLevel * 720;
      if (this.osc1) this.osc1.frequency.setTargetAtTime(baseFreq, t, 0.05);
      if (this.osc2) this.osc2.frequency.setTargetAtTime(baseFreq * 2.01, t, 0.05);
      if (this.filter) this.filter.frequency.setTargetAtTime(400 + this.revLevel * 3200, t, 0.05);
    }
  }

  public start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;
    this.isPlaying = true;

    const t = this.ctx.currentTime;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, t);
    this.masterGain.connect(this.ctx.destination);

    // Engine Gain with subtle ramp up
    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.setValueAtTime(0, t);
    this.engineGain.gain.linearRampToValueAtTime(0.35, t + 0.15);

    // Filter
    this.filter = this.ctx.createBiquadFilter();

    if (this.mode === 'v8') {
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(320, t);
      this.filter.Q.setValueAtTime(3, t);

      // Oscillators for rich combustion rumble
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(45, t);

      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(68, t);

      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(22, t);

      // Noise generator for exhaust turbulence
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(120, t);
      noiseFilter.Q.setValueAtTime(1.5, t);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, t);

      this.noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.engineGain);

      this.osc1.connect(this.filter);
      this.osc2.connect(this.filter);
      this.subOsc.connect(this.engineGain);
      this.filter.connect(this.engineGain);

      this.engineGain.connect(this.masterGain);

      this.osc1.start();
      this.osc2.start();
      this.subOsc.start();
      this.noiseNode.start();
    } else {
      // Electric hypercar high-frequency motor harmonics
      this.filter.type = 'bandpass';
      this.filter.frequency.setValueAtTime(520, t);
      this.filter.Q.setValueAtTime(4.5, t);

      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(220, t);

      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'sawtooth';
      this.osc2.frequency.setValueAtTime(440, t);

      const osc2Gain = this.ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.12, t);

      this.osc1.connect(this.engineGain);
      this.osc2.connect(this.filter);
      this.filter.connect(osc2Gain);
      osc2Gain.connect(this.engineGain);

      this.engineGain.connect(this.masterGain);

      this.osc1.start();
      this.osc2.start();
    }

    this.setRev(this.revLevel);
  }

  public stop() {
    if (!this.isPlaying || !this.ctx) return;

    const t = this.ctx.currentTime;
    if (this.engineGain) {
      this.engineGain.gain.linearRampToValueAtTime(0, t + 0.1);
    }

    setTimeout(() => {
      try {
        this.osc1?.stop();
        this.osc2?.stop();
        this.subOsc?.stop();
        this.noiseNode?.stop();

        this.osc1?.disconnect();
        this.osc2?.disconnect();
        this.subOsc?.disconnect();
        this.noiseNode?.disconnect();
        this.filter?.disconnect();
        this.engineGain?.disconnect();
        this.masterGain?.disconnect();
      } catch {
        // ignore disconnect race conditions
      }

      this.osc1 = null;
      this.osc2 = null;
      this.subOsc = null;
      this.noiseNode = null;
      this.filter = null;
      this.engineGain = null;
      this.masterGain = null;
      this.isPlaying = false;
    }, 120);
  }

  /**
   * Quick pulse rev throttle sound effect (e.g. for button press)
   */
  public blipThrottle() {
    if (!this.isPlaying) {
      this.start();
      setTimeout(() => {
        this.runThrottleSequence();
      }, 50);
    } else {
      this.runThrottleSequence();
    }
  }

  private runThrottleSequence() {
    if (!this.ctx) return;
    this.setRev(0.85);
    setTimeout(() => {
      this.setRev(0.95);
    }, 180);
    setTimeout(() => {
      this.setRev(0.3);
    }, 550);
  }
}

export const soundEngine = new SupercarSoundEngine();
