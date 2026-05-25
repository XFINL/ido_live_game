import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const StoryPage = () => {
  const navigate = useNavigate();
  const [holdTime, setHoldTime] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const storyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const storyContent = [
    '在一个遥远的小镇，',
    '有一个关于铃铛的传说，',
    '每当夜幕降临，',
    '清脆的铃声便会响起，',
    '引领着迷失的灵魂找到回家的路...',
    '而你，',
    '将成为这个故事的主角。'
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentTextIndex < storyContent.length) {
      const currentSentence = storyContent[currentTextIndex];
      if (charIndex < currentSentence.length) {
        const timer = setTimeout(() => {
          setDisplayText((prev) => prev + currentSentence[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, 100);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentTextIndex((prev) => prev + 1);
          setDisplayText('');
          setCharIndex(0);
        }, 1500);
        return () => clearTimeout(timer);
      }
    } else {
      storyTimerRef.current = setTimeout(() => {
        navigate('/main');
      }, 2000);
    }
    return () => {
      if (storyTimerRef.current) clearTimeout(storyTimerRef.current);
    };
  }, [currentTextIndex, charIndex, navigate]);

  useEffect(() => {
    let holdInterval: NodeJS.Timeout | null = null;
    if (isHolding) {
      holdInterval = setInterval(() => {
        setHoldTime((prev) => {
          if (prev >= 5) {
            if (holdInterval) clearInterval(holdInterval);
            navigate('/main');
            return prev;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      if (holdInterval) clearInterval(holdInterval);
      setHoldTime(0);
    }
    return () => {
      if (holdInterval) clearInterval(holdInterval);
    };
  }, [isHolding, navigate]);

  const handleMouseDown = () => setIsHolding(true);
  const handleMouseUp = () => setIsHolding(false);
  const handleMouseLeave = () => setIsHolding(false);
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsHolding(true);
  };
  const handleTouchEnd = () => setIsHolding(false);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{
        background: 'linear-gradient(135deg, #ff4757 0%, #ff6b81 50%, #ffffff 100%)'
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full max-w-lg">
        <div className="backdrop-blur-xl bg-white/20 rounded-3xl p-10 shadow-2xl border border-white/30 min-h-[400px] flex flex-col items-center justify-center">
          <div className="text-2xl text-white text-center leading-relaxed mb-8">
            {displayText}
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 w-full max-w-md px-4">
        <div className="backdrop-blur-md bg-white/20 rounded-2xl p-4 border border-white/30">
          <div className="text-white text-center mb-2">
            长按屏幕5秒可跳过剧情
          </div>
          <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 rounded-full"
              style={{ width: `${Math.min((holdTime / 5) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
