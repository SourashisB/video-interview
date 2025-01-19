import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { essayPrompts } from '../data/prompts.ts';

const VideoEssay = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [recordingTime, setRecordingTime] = useState(30);
  const [autoStartCountdown, setAutoStartCountdown] = useState(60); // 60 seconds countdown
  const [isAutoStartEnabled, setIsAutoStartEnabled] = useState(true);
  const navigate = useNavigate();

  // Debug logging for prompt changes
  useEffect(() => {
    console.log('Current Prompt Index:', currentPromptIndex);
    console.log('Current Question:', essayPrompts[currentPromptIndex].question);
  }, [currentPromptIndex]);

  // Auto-start countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoStartEnabled && !isRecording && countdown === null) {
      interval = setInterval(() => {
        setAutoStartCountdown((prev) => {
          if (prev <= 1) {
            setIsAutoStartEnabled(false);
            toggleRecording();
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoStartEnabled, isRecording, countdown]);

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(userStream);
        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev <= 1) {
            toggleRecording();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setRecordingTime(30);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording]);

  const moveToNextPrompt = () => {
    if (currentPromptIndex >= essayPrompts.length - 1) {
      navigate('/thank-you');
    } else {
      setTimeout(() => {
        setCurrentPromptIndex(prev => {
          console.log('Moving from prompt', prev, 'to', prev + 1);
          return prev + 1;
        });
        setRecordingTime(30);
        setIsRecording(false);
        setAutoStartCountdown(60);
        setIsAutoStartEnabled(true);
      }, 100);
    }
  };

  const handleCountdownComplete = () => {
    setCountdown(null);
    moveToNextPrompt();
  };

  const startCountdown = () => {
    setCountdown(3);
    let count = 3;
    
    const interval = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        clearInterval(interval);
        handleCountdownComplete();
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      startCountdown();
    } else {
      setIsRecording(true);
      setRecordingTime(30);
      setAutoStartCountdown(60);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">
              Essay {currentPromptIndex + 1} of {essayPrompts.length}
            </h1>
            <span className={`text-lg font-semibold ${
              recordingTime <= 10 ? 'text-red-600' : 'text-gray-600'
            }`}>
              Time Remaining: {formatTime(recordingTime)}
            </span>
          </div>
          <p className="text-gray-700 mb-6">
            {essayPrompts[currentPromptIndex].question}
          </p>
          {!isRecording && isAutoStartEnabled && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800 font-medium">
                Recording will automatically start in: {formatTime(autoStartCountdown)}
              </p>
              <div className="w-full bg-yellow-200 rounded-full h-1.5 mt-2">
                <div 
                  className="bg-yellow-500 h-1.5 rounded-full transition-all duration-1000"
                  style={{ width: `${(autoStartCountdown / 60) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Camera Preview</h2>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full rounded-lg bg-black aspect-video"
            />
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Recording Controls</h2>
            {countdown !== null ? (
              <div className="text-center py-8">
                <p className="text-4xl font-bold text-blue-600">
                  Next question in: {countdown}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setIsAutoStartEnabled(false);
                    toggleRecording();
                  }}
                  disabled={countdown !== null}
                  className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                    isRecording 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } disabled:opacity-50`}
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
                {isRecording && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
                        style={{ width: `${(recordingTime / 30) * 100}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-center text-red-600 font-medium">
                      Recording in progress...
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoEssay;