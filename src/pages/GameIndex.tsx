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
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: 'rgb(0, 0, 0)' }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg mb-4">
            铃
          </h1>
          <p className="text-gray-500 text-lg">
            你的明星之路从这里开始
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleStartGame}
            className="w-full py-4 px-6 rounded-2xl text-white font-bold text-lg border transition-all duration-300 hover:bg-white/25 hover:shadow-lg"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', borderColor: 'rgb(23, 23, 23)' }}
          >
            开始游戏
          </button>

          <button
            onClick={handleContinueGame}
            disabled={!hasSaveData}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-lg border transition-all duration-300 ${
              hasSaveData
                ? 'text-white hover:bg-white/25 hover:shadow-lg'
                : 'text-gray-600 cursor-not-allowed'
            }`}
            style={{
              backgroundColor: hasSaveData ? 'rgba(255, 255, 255, 0.1)' : 'rgba(23, 23, 23, 0.5)',
              borderColor: 'rgb(23, 23, 23)'
            }}
          >
            继续游戏
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameIndex;
