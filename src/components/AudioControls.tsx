import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Zap, Flame } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface AudioControlsProps {
  currentSoundType?: 'v8' | 'electric';
  onSoundToggle?: (active: boolean) => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({ currentSoundType = 'v8', onSoundToggle }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [soundMode, setSoundMode] = useState<'v8' | 'electric'>(currentSoundType);
  const [volume, setVolume] = useState<number>(0.35);
  const [isRevving, setIsRevving] = useState<boolean>(false);

  useEffect(() => {
    soundEngine.setMode(currentSoundType);
    setSoundMode(currentSoundType);
  }, [currentSoundType]);

  const togglePlayback = () => {
    if (isPlaying) {
      soundEngine.stop();
      setIsPlaying(false);
      onSoundToggle?.(false);
    } else {
      soundEngine.start();
      setIsPlaying(true);
      onSoundToggle?.(true);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
    if (isMuted && val > 0) {
      setIsMuted(false);
      soundEngine.setMuted(false);
    }
  };

  const handleModeChange = (mode: 'v8' | 'electric') => {
    setSoundMode(mode);
    soundEngine.setMode(mode);
  };

  const handleRevDown = () => {
    setIsRevving(true);
    if (!isPlaying) {
      soundEngine.start();
      setIsPlaying(true);
      onSoundToggle?.(true);
    }
    soundEngine.setRev(0.92);
  };

  const handleRevUp = () => {
    setIsRevving(false);
    soundEngine.setRev(0.2);
  };

  return (
    <div className="bg-[#17191D]/90 backdrop-blur-md border border-white/10 rounded-xl p-3 flex flex-wrap items-center gap-3">
      {/* Play/Pause state */}
      <button
        onClick={togglePlayback}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
          isPlaying
            ? 'bg-[#00E5FF] text-black hover:bg-[#38bdf8]'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
        title={isPlaying ? 'Stop Engine Acoustics' : 'Start Engine Acoustics (Procedural Audio)'}
      >
        {isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5 fill-current" />
            <span>Sound Off</span>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Sound Preview</span>
          </>
        )}
      </button>

      {/* Mode Selector */}
      <div className="flex items-center p-0.5 bg-[#08090B] rounded-lg border border-white/10 text-xs">
        <button
          onClick={() => handleModeChange('v8')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
            soundMode === 'v8' ? 'bg-white/15 text-white font-medium' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Flame className="w-3 h-3 text-orange-400" />
          <span>V8 Twin-Turbo</span>
        </button>
        <button
          onClick={() => handleModeChange('electric')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
            soundMode === 'electric' ? 'bg-white/15 text-[#00E5FF] font-medium' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Zap className="w-3 h-3 text-[#00E5FF]" />
          <span>Electric Warp</span>
        </button>
      </div>

      {/* Throttle Rev Pedal Trigger */}
      <button
        onMouseDown={handleRevDown}
        onMouseUp={handleRevUp}
        onTouchStart={handleRevDown}
        onTouchEnd={handleRevUp}
        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-widest transition-all select-none border ${
          isRevving
            ? 'bg-red-500 text-white border-red-400 scale-95 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
            : 'bg-white/5 border-white/15 text-neutral-300 hover:text-white hover:border-white/30'
        }`}
        title="Hold to Rev Engine to Redline"
      >
        {isRevving ? 'Throttle Open 9,500 RPM' : 'Hold to Rev RPM'}
      </button>

      {/* Volume & Mute */}
      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={toggleMute}
          className="text-neutral-400 hover:text-white transition-colors"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          aria-label="Acoustic volume"
          className="w-16 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
        />
      </div>
    </div>
  );
};
