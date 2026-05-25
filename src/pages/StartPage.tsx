import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

const StartPage = () => {
  const navigate = useNavigate();
  const { gender, setGender, setStageName } = useGameStore();
  const [nameInput, setNameInput] = useState('');

  const handleStart = () => {
    if (gender && nameInput.trim()) {
      setStageName(nameInput.trim());
      navigate('/story');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #ff4757 0%, #ff6b81 50%, #ffffff 100%)'
      }}
    >
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/30 rounded-3xl p-8 shadow-2xl border border-white/40">
          <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
            铃
          </h1>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-3">选择性别</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setGender('male')}
                className={`py-4 px-6 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
                  gender === 'male'
                    ? 'bg-white/50 border-white/70 shadow-lg'
                    : 'bg-white/20 border-white/30 hover:bg-white/30'
                }`}
              >
                <div className="text-white font-semibold">男</div>
              </button>
              <button
                onClick={() => setGender('female')}
                className={`py-4 px-6 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
                  gender === 'female'
                    ? 'bg-white/50 border-white/70 shadow-lg'
                    : 'bg-white/20 border-white/30 hover:bg-white/30'
                }`}
              >
                <div className="text-white font-semibold">女</div>
              </button>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-white font-semibold mb-3">输入艺名</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="请输入你的艺名"
              className="w-full py-4 px-6 rounded-2xl backdrop-blur-md bg-white/30 border border-white/40 text-white placeholder-white/60 focus:outline-none focus:border-white/70 focus:bg-white/40 transition-all duration-300"
            />
          </div>

          <button
            onClick={handleStart}
            disabled={!gender || !nameInput.trim()}
            className={`w-full py-4 rounded-2xl font-bold text-lg backdrop-blur-md border transition-all duration-300 ${
              gender && nameInput.trim()
                ? 'bg-white/40 border-white/60 text-white hover:bg-white/50 hover:shadow-lg'
                : 'bg-white/20 border-white/30 text-white/50 cursor-not-allowed'
            }`}
          >
            开始游戏
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
