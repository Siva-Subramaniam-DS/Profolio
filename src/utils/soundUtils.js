/**
 * Web Audio API based sound utility to generate UI sounds synthetically.
 * This avoids the need for external assets and ensures instant playback.
 */

class SoundManager {
    constructor() {
        this.context = null;
        this.isEnabled = true;
        this.bgMusic = null;
        this.audioElement = null;
        this.isMusicPlaying = false;
        this.bgMusicUrl = '/Breaking%20Free%20from%20Samsara.mp3'; // User provided track
    }

    initContext() {
        if (!this.context) {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.context.state === 'suspended') {
            this.context.resume();
        }
    }

    initMusic() {
        if (!this.audioElement) {
            this.audioElement = new Audio(this.bgMusicUrl);
            this.audioElement.loop = true;
            this.audioElement.volume = 0.3; // Default low volume
        }
    }

    playClick() {
        if (!this.isEnabled) return;
        this.initContext();

        const osc1 = this.context.createOscillator();
        const osc2 = this.context.createOscillator();
        const gain = this.context.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(400, this.context.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(10, this.context.currentTime + 0.1);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(800, this.context.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(10, this.context.currentTime + 0.1);

        gain.gain.setValueAtTime(0.1, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.context.destination);

        osc1.start();
        osc2.start();
        osc1.stop(this.context.currentTime + 0.1);
        osc2.stop(this.context.currentTime + 0.1);
    }

    playHover() {
        if (!this.isEnabled) return;
        this.initContext();

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.context.currentTime + 0.05);

        gain.gain.setValueAtTime(0.02, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.context.destination);

        osc.start();
        osc.stop(this.context.currentTime + 0.05);
    }

    playPop() {
        if (!this.isEnabled) return;
        this.initContext();

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.context.currentTime + 0.1);

        gain.gain.setValueAtTime(0.1, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.context.destination);

        osc.start();
        osc.stop(this.context.currentTime + 0.1);
    }

    toggleMusic() {
        this.initMusic();
        if (this.isMusicPlaying) {
            this.audioElement.pause();
            this.isMusicPlaying = false;
        } else {
            this.audioElement.play().catch(e => console.log("Audio playback blocked", e));
            this.isMusicPlaying = true;
        }
        return this.isMusicPlaying;
    }

    setMusicVolume(vol) {
        if (this.audioElement) {
            this.audioElement.volume = vol;
        }
    }

    setMuted(muted) {
        this.isEnabled = !muted;
        if (this.audioElement) {
            this.audioElement.muted = muted;
        }
    }
}

export const soundManager = new SoundManager();
