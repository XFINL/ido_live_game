import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

const GameIndex = () => {
  const navigate = useNavigate();
  const { stageName } = useGameStore();
  const hasSaveData = !!stageName;

  const handleStartGame = () => {
    navigate('/start');
  };

  const handleContinueGame = () => {
    navigate('/main');
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'rgb(0, 0, 0)' }}
    >
      {/* 顶部装饰元素 */}
      <div className="p-8 md:p-12">
        <div className="flex justify-between items-start">
          <div className="w-3 h-3" style={{ backgroundColor: 'rgb(255, 255, 255)' }}></div>
          <div className="text-gray-600 text-xs tracking-widest uppercase">
            2026
          </div>
        </div>
      </div>

      {/* 主内容 - 严格的网格布局 */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto w-full">
          {/* 大标题 - 瑞士风格排版 */}
          <div className="mb-16">
            <h1
              className="text-7xl md:text-9xl lg:text-[12rem] font-bold leading-none tracking-tight"
              style={{ color: 'rgb(255, 255, 255)', letterSpacing: '-0.05em' }}
            >
              铃
            </h1>
          </div>

          {/* 副标题 */}
          <div className="mb-20">
            <p
              className="text-lg md:text-xl tracking-widest uppercase"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              BELL / YOUR JOURNEY BEGINS
            </p>
          </div>

          {/* 按钮区域 - 极简功能性设计 */}
          <div className="space-y-0">
            <button
              onClick={handleStartGame}
              className="group w-full flex items-center justify-between py-8 border-t border-b transition-all duration-300 hover:bg-white/5"
              style={{ borderColor: 'rgb(23, 23, 23)' }}
            >
              <span className="text-2xl md:text-3xl font-medium tracking-wide" style={{ color: 'rgb(255, 255, 255)' }}>
                开始游戏
              </span>
              <svg
                className="w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 group-hover:translate-x-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: 'rgb(255, 255, 255)' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            <button
              onClick={handleContinueGame}
              disabled={!hasSaveData}
              className={`group w-full flex items-center justify-between py-8 border-b transition-all duration-300 ${
                hasSaveData ? 'hover:bg-white/5' : ''
              }`}
              style={{ borderColor: 'rgb(23, 23, 23)' }}
            >
              <span
                className={`text-2xl md:text-3xl font-medium tracking-wide ${
                  hasSaveData ? '' : 'opacity-40'
                }`}
                style={{ color: hasSaveData ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.3)' }}
              >
                继续游戏
              </span>
              {hasSaveData && (
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: 'rgb(255, 255, 255)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 底部装饰元素 */}
      <div className="p-8 md:p-12">
        <div className="flex justify-between items-end">
          <div className="flex gap-1">
            <div className="w-2 h-2" style={{ backgroundColor: 'rgb(255, 255, 255)' }}></div>
            <div className="w-2 h-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}></div>
            <div className="w-2 h-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}></div>
          </div>
          <div className="text-gray-600 text-xs tracking-widest uppercase">
            01
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameIndex;
