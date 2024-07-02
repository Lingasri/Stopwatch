import React, { useState, useEffect } from 'react';

const WatchComponent = () => {
  // State Variables
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // useEffect Hook for Timer
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const now = Date.now();
        setElapsedTime(now - startTime);
      }, 10); // Update every 10 milliseconds for better accuracy

      // Clean up the interval on component unmount or when isRunning changes to false
      return () => clearInterval(interval);
    } else {
      clearInterval(interval); // Clear interval if not running
    }
  }, [isRunning, startTime]);

  // Start Timer Handler
  const handleStart = () => {
    const now = Date.now();
    setStartTime(now - elapsedTime); // Adjust start time based on elapsed time when paused
    setIsRunning(true);
  };

  // Pause Timer Handler
  const handlePause = () => {
    setIsRunning(false);
  };

  // Reset Timer Handler
  const handleReset = () => {
    setStartTime(null);
    setElapsedTime(0);
    setIsRunning(false);
  };

  // Utility function to format time
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${milliseconds < 10 ? '0' : ''}${milliseconds}`;
  };

  // Render method
  return (
    <div className="watch-component">
      <div className="elapsed-time">{formatTime(elapsedTime)}</div>
      <div className="controls">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default WatchComponent;
