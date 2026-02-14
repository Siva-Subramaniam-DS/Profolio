import React, { useState } from 'react';
import { soundManager } from '../utils/soundUtils';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.3);

    const toggleMusic = () => {
        const playing = soundManager.toggleMusic();
        setIsPlaying(playing);
        soundManager.playClick();
    };

    const handeVolumeChange = (e) => {
        const newVol = parseFloat(e.target.value);
        setVolume(newVol);
        soundManager.setMusicVolume(newVol);
    };

    return (
        <div className="music-player">
            <button
                className={`music-toggle ${isPlaying ? 'playing' : ''}`}
                onClick={toggleMusic}
                title={isPlaying ? "Mute Music" : "Play Music"}
            >
                <i className={`fas ${isPlaying ? 'fa-volume-up' : 'fa-music'}`}></i>
                {isPlaying && <div className="equalizer-animation">
                    <span></span><span></span><span></span>
                </div>}
            </button>

            {isPlaying && (
                <div className="volume-control">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={handeVolumeChange}
                        className="volume-slider"
                    />
                </div>
            )}
        </div>
    );
};

export default MusicPlayer;
