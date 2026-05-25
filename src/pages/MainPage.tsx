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
      className="min-h-screen pb-24"
      style={{
        background: 'linear-gradient(135deg, #ff4757 0%, #ff6b81 50%, #ffffff 100%)'
      }}
    >
      <div className="p-6">
        <div className="backdrop-blur-xl bg-white/25 rounded-3xl p-6 shadow-2xl border border-white/35 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full backdrop-blur-md bg-white/40 border border-white/50 flex items-center justify-center">
              <span className="text-2xl text-white">
                {gender === 'male' ? '男' : '女'}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{stageName}</h2>
              <p className="text-white/80">欢迎来到铃的世界</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="backdrop-blur-xl bg-white/20 rounded-2xl p-5 shadow-xl border border-white/30">
            <div className="text-white/70 text-sm mb-2">铃铛数</div>
            <div className="text-3xl font-bold text-white">0</div>
          </div>
          <div className="backdrop-blur-xl bg-white/20 rounded-2xl p-5 shadow-xl border border-white/30">
            <div className="text-white/70 text-sm mb-2">等级</div>
            <div className="text-3xl font-bold text-white">1</div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/20 rounded-3xl p-6 shadow-2xl border border-white/30">
          <h3 className="text-xl font-bold text-white mb-4">今日任务</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/10">
              <span className="text-white">完成一段剧情</span>
              <span className="text-white/60 text-sm">未完成</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/10">
              <span className="text-white">收集铃铛</span>
              <span className="text-white/60 text-sm">未完成</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
        <div className="backdrop-blur-xl bg-white/25 rounded-3xl p-2 shadow-2xl border border-white/35">
          <div className="flex justify-around">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 ${
                  activeTab === item.id ? 'bg-white/40' : 'hover:bg-white/20'
                }`}
              >
                <div className="w-8 h-8 mb-1 text-white flex items-center justify-center">
                  <span className="text-xl font-bold">◇</span>
                </div>
                <span
                  className={`text-sm ${
                    activeTab === item.id ? 'text-white font-semibold' : 'text-white/70'
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
