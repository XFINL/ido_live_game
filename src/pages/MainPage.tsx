import { useState } from 'react';
import { useGameStore } from '../store/gameStore';

const MainPage = () => {
  const { stageName, gender } = useGameStore();
  const [activeTab, setActiveTab] = useState('home');

  const menuItems = [
    { id: 'home', name: '首页' },
    { id: 'story', name: '剧情' },
    { id: 'shop', name: '商店' },
    { id: 'profile', name: '我的' }
  ];

  return (
    <div
      className="min-h-screen pb-24 bg-black"
    >
      <div className="p-6">
        <div className="bg-gray-900/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-gray-700/50 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-800/80 border border-gray-600 flex items-center justify-center">
              <span className="text-2xl text-white">
                {gender === 'male' ? '男' : '女'}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{stageName}</h2>
              <p className="text-gray-400">欢迎来到你的星途</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-gray-700/50">
            <div className="text-gray-400 text-sm mb-2">粉丝数</div>
            <div className="text-3xl font-bold text-white">0</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-gray-700/50">
            <div className="text-gray-400 text-sm mb-2">人气值</div>
            <div className="text-3xl font-bold text-white">100</div>
          </div>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-4">今日行程</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-800/50">
              <span className="text-white">练习室训练</span>
              <span className="text-gray-500 text-sm">未完成</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-800/50">
              <span className="text-white">社交媒体更新</span>
              <span className="text-gray-500 text-sm">未完成</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-2 shadow-2xl border border-gray-700/50">
          <div className="flex justify-around">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 ${
                  activeTab === item.id ? 'bg-white/15' : 'hover:bg-white/10'
                }`}
              >
                <div className="w-8 h-8 mb-1 text-white flex items-center justify-center">
                  <span className="text-xl font-bold">◇</span>
                </div>
                <span
                  className={`text-sm ${
                    activeTab === item.id ? 'text-white font-semibold' : 'text-gray-400'
                  }`}
                >
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
