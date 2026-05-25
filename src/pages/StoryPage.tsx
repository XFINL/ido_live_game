import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const StoryPage = () => {
  const navigate = useNavigate();
  const [holdTime, setHoldTime] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const storyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const storyContent = [
    '大学毕业了...',
    '你拖着沉重的行李箱，',
    '站在了这座陌生城市的土地上。',
    '霓虹灯闪烁，车水马龙，',
    '这座城市承载着无数人的梦想。',
    '你找到了一间小小的出租屋，',
    '放下行李，坐在床边。',
    '窗外是城市的夜景，',
    '你回想起了自己的梦想...',
    '成为一名闪耀的偶像！',
    '这条路注定不会平坦，',
    '但你已经准备好了。',
    '你的星途，从此刻开始...'
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
        }, 80);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentTextIndex((prev) => prev + 1);
          setDisplayText('');
          setCharIndex(0);
        }, 1800);
        return () => clearTimeout(timer);
      }
    } else {
      storyTimerRef.current = setTimeout(() => {
        navigate('/main');
      }, 2500);
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
      style={{ backgroundColor: 'rgb(0, 0, 0)' }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full max-w-2xl">
        <div className="min-h-[400px] flex flex-col items-center justify-center">
          <p className="text-xl md:text-2xl text-white text-center leading-relaxed mb-8">
            {displayText}
          </p>
        </div>
      </div>

      <div className="fixed bottom-12 w-full max-w-md px-4">
        <div className="text-center">
          <div className="text-gray-500 text-sm mb-3">
            长按屏幕5秒可跳过剧情
          </div>
          <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden">
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
