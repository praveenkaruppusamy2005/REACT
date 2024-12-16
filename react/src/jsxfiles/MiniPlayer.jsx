import React, { useState, useRef, useEffect } from 'react';
import '../cssfiles/MiniPlayer.css';
import play from '../assets/icons/play.png';
import pause from '../assets/icons/pause.png';
import previous from '../assets/icons/previous.png';
import next from '../assets/icons/next.png';
import more from '../assets/icons/more_vert.png';
import repeat from '../assets/icons/repeat.png';
import volume from '../assets/icons/volume.png';
import volume1 from '../assets/icons/volume_mute.png';
import fs from '../assets/icons/full_screen.png';
import e from '../assets/icons/exit.png';

function MiniPlayer(props) {
  const clickRef = useRef();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentsong, setCurrentsong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [volumea, setvolume] = useState(false);
  const [svolume, setsVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  const [exit, setExit] = useState(true);

  useEffect(() => {
    if (props.songs.length > 0) {
      setCurrentsong(props.songs[0]);
    }
  }, [props.songs]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
    }
  }, [currentsong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = svolume;
    }
  }, [svolume]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const handleSeekClick = (e) => {
    if (!currentsong) return;
    const width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const percentage = (offset / width) * 100;
    const newTime = (percentage / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const nvolume = e.target.value;
    setsVolume(nvolume);
    setvolume(nvolume === '0');
  };

  const handlev = () => {
    if (volumea) {
      setsVolume(prevVolume);
      audioRef.current.volume = prevVolume;
    } else {
      setPrevVolume(svolume);
      setsVolume(0);
      audioRef.current.volume = 0;
    }
    setvolume(!volumea);
  };

  const handleMouseDown = (e) => {
    if (!currentsong) return;
    setIsDragging(true);
    handleSeekClick(e);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !currentsong) return;
    const width = clickRef.current.clientWidth;
    const offsetX = e.clientX - clickRef.current.getBoundingClientRect().left;
    const percentage = Math.min(Math.max(offsetX / width, 0), 1);
    const newTime = percentage * duration;
    setCurrentTime(newTime);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const previousPlay = () => {
    if (!currentsong || props.songs.length === 0) return;
    const index = props.songs.indexOf(currentsong);
    const prevIndex = index === 0 ? props.songs.length - 1 : index - 1;
    audioRef.current.pause();
    setCurrentsong(props.songs[prevIndex]);
    setIsPlaying(false);
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 0);
  };

  const nextPlay = () => {
    if (!currentsong || props.songs.length === 0) return;
    const index = props.songs.indexOf(currentsong);
    const nextIndex = index === props.songs.length - 1 ? 0 : index + 1;
    audioRef.current.pause();
    setCurrentsong(props.songs[nextIndex]);
    setIsPlaying(false);
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 0);
  };

  const Playing_now = () => {
    if (!isDragging && audioRef.current) {
      const ct = audioRef.current.currentTime;
      setCurrentTime(ct);
    }
  };

  return (
    <div className="main_player_div">
      <div className="song_details">
        <div className="poster_div">
          {currentsong ? (
            <>
              <img
                src={currentsong.songimage}
                alt="Song Poster"
                className="img_poster"
              />
              <div className="song_name">
                <p className="song_name1">{currentsong.songname}</p>
                <p className="song_name2">{currentsong.songauthors.join(', ')}</p>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="player_controls">
          <button className="pause_play_btn" disabled={!currentsong}>
            <img
              src={previous}
              alt="Previous Icon"
              className="play_pause"
              onClick={previousPlay}
            />
          </button>
          <button
            className="pause_play_btn"
            onClick={togglePlayPause}
            disabled={!currentsong}
          >
            <img
              src={isPlaying ? pause : play}
              alt="Play/Pause Icon"
              className="play_pause"
            />
          </button>
          {currentsong && (
            <audio
              ref={audioRef}
              src={currentsong.songlink}
              onTimeUpdate={Playing_now}
            />
          )}
          <button className="pause_play_btn" disabled={!currentsong}>
            <img src={next} alt="Next Icon" className="play_pause" onClick={nextPlay} />
          </button>
          <img src={repeat} style={{ height: '26px', marginTop: '2px' }} alt="Repeat Icon" />
        </div>
        <div className="navigation">
          <span className="duration_time">
            {currentsong ? formatTime(currentTime) : '-:--'}
          </span>
          <div
            className={`navigation_wrap ${!currentsong ? 'disabled' : ''}`}
            onClick={handleSeekClick}
            ref={clickRef}
            onMouseDown={handleMouseDown}
          >
            <div
              className="seek_bar"
              style={{
                width: `${currentsong ? (currentTime / duration) * 100 : 0}%`,
                backgroundColor: !currentsong ? '#ccc' : '#1db954',
              }}
            >
              <span
                className={`seek_bar_handle ${!currentsong ? 'disabled' : ''}`}
              ></span>
            </div>
          </div>
          <span className="length_time">
            {currentsong ? formatTime(duration) : '-:--'}
          </span>
        </div>
      </div>
      <div className="options">
        <img
          src={more}
          style={{ height: '30px', transform: 'rotate(90deg)' }}
          alt="More Options"
        />
        <img
          src={volumea ? volume1 : volume}
          style={{ height: '25px' }}
          alt="Volume Icon"
          onClick={handlev}
        />
        <input
          type="range"
          className="volume-slider"
          min="0"
          max="1"
          step="0.01"
          value={svolume}
          onChange={handleVolumeChange}
        />
      </div>
      <div className="exit_s">
        <img
          src={exit ? fs : e}
          style={{ height: '70%', width: '70%' }}
          onClick={() => setExit(!exit)}
        />
      </div>
    </div>
  );
}

export default MiniPlayer;
