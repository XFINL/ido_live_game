import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 道具数据类型
interface Item {
  id: number;
  name: string;
  description: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic';
  count: number;
}

const BagPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  // 模拟道具数据
  const items: Item[] = [
    { id: 1, name: '麦克风', description: '提高歌唱能力', category: 'equipment', rarity: 'rare', count: 1 },
    { id: 2, name: '舞蹈鞋', description: '提高舞蹈能力', category: 'equipment', rarity: 'common', count: 1 },
    { id: 3, name: '粉丝信', description: '来自粉丝的祝福', category: 'gift', rarity: 'common', count: 12 },
    { id: 4, name: '专辑', description: '你的第一张专辑', category: 'item', rarity: 'epic', count: 3 },
    { id: 5, name: '化妆品', description: '演出时使用', category: 'equipment', rarity: 'common', count: 1 },
    { id: 6, name: '荧光棒', description: '粉丝应援物品', category: 'gift', rarity: 'common', count: 8 },
    { id: 7, name: '录音设备', description: '专业录音设备', category: 'equipment', rarity: 'epic', count: 1 },
    { id: 8, name: '生日礼物', description: '来自朋友的礼物', category: 'gift', rarity: 'rare', count: 1 },
    { id: 9, name: '签名照', description: '你的签名照片', category: 'item', rarity: 'common', count: 25 },
  ];

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'equipment', name: '装备' },
    { id: 'gift', name: '礼物' },
    { id: 'item', name: '道具' },
  ];

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(item => item.category === activeCategory);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'epic':
        return 'rgba(255, 200, 0, 0.2)';
      case 'rare':
        return 'rgba(100, 150, 255, 0.2)';
      default:
        return 'rgba(255, 255, 255, 0.1)';
    }
  };

  const getRarityBorderColor = (rarity: string) => {
    switch (rarity) {
      case 'epic':
        return 'rgba(255, 200, 0, 0.5)';
      case 'rare':
        return 'rgba(100, 150, 255, 0.5)';
      default:
        return 'rgb(23, 23, 23)';
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'rgb(0, 0, 0)' }}
    >
      {/* 顶部导航 */}
      <div className="p-6 md:p-8 border-b" style={{ borderColor: 'rgb(23, 23, 23)' }}>
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/main')}
            className="flex items-center gap-2 text-white hover:text-gray-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg tracking-wide">返回</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">背包</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* 分类标签 */}
      <div className="px-6 md:px-8 py-4 border-b" style={{ borderColor: 'rgb(23, 23, 23)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 md:px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'text-white'
                    : 'text-gray-500 hover:text-white'
                }`}
                style={{
                  backgroundColor: activeCategory === category.id ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  border: '1px solid',
                  borderColor: activeCategory === category.id ? 'rgb(23, 23, 23)' : 'rgb(23, 23, 23)',
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 道具网格 */}
      <div className="flex-1 p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="rounded-2xl p-4 md:p-6 transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: getRarityColor(item.rarity),
                  border: '1px solid',
                  borderColor: getRarityBorderColor(item.rarity),
                }}
              >
                {/* 道具图标 */}
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: 'rgb(23, 23, 23)' }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-white">◇</div>
                </div>

                {/* 道具名称 */}
                <h3 className="text-white text-center font-medium text-sm md:text-base mb-1">
                  {item.name}
                </h3>

                {/* 道具描述 */}
                <p className="text-gray-500 text-xs md:text-sm text-center mb-3">
                  {item.description}
                </p>

                {/* 数量 */}
                <div className="text-center">
                  <span className="text-gray-400 text-xs md:text-sm">
                    x{item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 空状态 */}
          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-gray-600 text-6xl mb-4">◇</div>
              <p className="text-gray-500 text-lg">暂无道具</p>
            </div>
          )}
        </div>
      </div>

      {/* 底部栏 */}
      <div className="p-6 md:p-8 border-t" style={{ borderColor: 'rgb(23, 23, 23)' }}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="text-gray-500 text-sm">
            共 {items.length} 种道具
          </div>
          <div className="text-gray-500 text-sm">
            总数量 {items.reduce((sum, item) => sum + item.count, 0)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagPage;
