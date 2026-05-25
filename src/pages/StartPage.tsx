import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

const StartPage = () => {
  const navigate = useNavigate();
  const { gender, setGender, setStageName } = useGameStore();
  const [nameInput, setNameInput] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  const handleStart = () => {
    if (gender && nameInput.trim()) {
      setStageName(nameInput.trim());
      navigate('/story');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-black"
    >
      <div className="w-full max-w-md">
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700/50">
          <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
            星途
          </h1>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-3">选择性别</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setGender('male')}
                className={`py-4 px-6 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
                  gender === 'male'
                    ? 'bg-white/20 border-white/50 shadow-lg'
                    : 'bg-gray-800/50 border-gray-600 hover:bg-gray-700/50'
                }`}
              >
                <div className="text-white font-semibold">男</div>
              </button>
              <button
                onClick={() => setGender('female')}
                className={`py-4 px-6 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
                  gender === 'female'
                    ? 'bg-white/20 border-white/50 shadow-lg'
                    : 'bg-gray-800/50 border-gray-600 hover:bg-gray-700/50'
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
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder="请输入你的艺名"
              className={`w-full py-4 px-6 rounded-2xl border transition-all duration-500 ${
                inputFocused
                  ? 'bg-gray-700/80 border-white/60 shadow-lg shadow-white/20'
                  : nameInput
                  ? 'bg-gray-800/70 border-gray-500'
                  : 'bg-gray-800/70 border-gray-600 animate-pulse'
              } text-white placeholder-gray-400 focus:outline-none`}
            />
          </div>

          <button
            onClick={handleStart}
            disabled={!gender || !nameInput.trim()}
            className={`w-full py-4 rounded-2xl font-bold text-lg border transition-all duration-300 ${
              gender && nameInput.trim()
                ? 'bg-white/15 border-white/40 text-white hover:bg-white/25 hover:shadow-lg'
                : 'bg-gray-800/50 border-gray-600 text-gray-500 cursor-not-allowed'
            }`}
          >
            开始旅程
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
