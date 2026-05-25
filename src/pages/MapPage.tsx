import { useNavigate } from 'react-router-dom';

const MapPage = () => {
  const navigate = useNavigate();

  const locations = [
    { id: 'home', name: '家', x: 50, y: 50, color: '#ffcc66', size: 24, icon: '◆' },
    { id: 'studio', name: '练习室', x: 25, y: 30, color: '#66ccff', size: 18, icon: '●' },
    { id: 'stage', name: '演出场地', x: 80, y: 25, color: '#ff66cc', size: 20, icon: '★' },
    { id: 'shop', name: '商店', x: 70, y: 70, color: '#66ff88', size: 16, icon: '■' },
    { id: 'park', name: '公园', x: 30, y: 75, color: '#88ffaa', size: 18, icon: '▲' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'rgb(0, 0, 0)' }}
    >
      <div className="p-6 md:p-8 border-b" style={{ borderColor: 'rgb(23, 23, 23)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/main')}
            className="flex items-center gap-2 text-white hover:text-gray-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg tracking-wide">返回</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">城市地图</h1>
          <div className="w-24" />
        </div>
      </div>

      <div className="flex-1 p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <div
            className="relative w-full aspect-square"
            style={{
              backgroundColor: 'rgb(20, 20, 25)',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '2px solid rgb(40, 40, 50)'
            }}
          >
            {/* 网格背景 */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(60, 60, 70)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* 道路 */}
            <div
              className="absolute"
              style={{
                top: '50%',
                left: 0,
                right: 0,
                height: '12px',
                backgroundColor: 'rgb(45, 45, 55)',
                transform: 'translateY(-50%)'
              }}
            />
            <div
              className="absolute"
              style={{
                left: '50%',
                top: 0,
                bottom: 0,
                width: '12px',
                backgroundColor: 'rgb(45, 45, 55)',
                transform: 'translateX(-50%)'
              }}
            />

            {/* 地点点 */}
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${loc.x}%`,
                  top: `${loc.y}%`
                }}
                onClick={() => loc.id === 'home' && navigate('/home')}
              >
                {/* 外圈光晕 */}
                <div
                  className="absolute -inset-4 rounded-full transition-all duration-300 group-hover:-inset-6"
                  style={{
                    backgroundColor: loc.color,
                    opacity: loc.id === 'home' ? 0.3 : 0.15,
                    filter: 'blur(8px)'
                  }}
                />

                {/* 主点 */}
                <div
                  className="relative flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-125"
                  style={{
                    width: `${loc.size}px`,
                    height: `${loc.size}px`,
                    backgroundColor: loc.color,
                    boxShadow: `0 0 20px ${loc.color}40, 0 0 40px ${loc.color}20`,
                    zIndex: 10
                  }}
                >
                  <span style={{ color: '#000', fontWeight: 'bold', fontSize: `${loc.size * 0.5}px` }}>
                    {loc.icon}
                  </span>
                </div>

                {/* 名称标签 */}
                <div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 rounded-full transition-all duration-300 group-hover:translate-y-1"
                  style={{
                    backgroundColor: 'rgba(23, 23, 23, 0.95)',
                    color: loc.color,
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    border: `1px solid ${loc.color}40`
                  }}
                >
                  {loc.name}
                  {loc.id === 'home' && <span className="text-gray-400 ml-1">点击进入</span>}
                </div>
              </div>
            ))}

            {/* 玩家当前位置指示 */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: '50%',
                top: '50%',
                zIndex: 20
              }}
            >
              <div
                className="w-6 h-6 rounded-full animate-pulse"
                style={{
                  backgroundColor: '#fff',
                  boxShadow: '0 0 20px #fff, 0 0 40px #fff'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t" style={{ borderColor: 'rgb(23, 23, 23)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            {locations.map((loc) => (
              <div key={loc.id} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: loc.color }}
                />
                <span className="text-gray-400 text-sm">{loc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
