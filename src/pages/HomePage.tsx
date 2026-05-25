import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const rooms = [
    { id: 'bedroom', name: '卧室', x: 75, y: 50, color: '#ffaa66', size: 140, icon: '◆' },
    { id: 'living', name: '客厅', x: 35, y: 50, color: '#66aaff', size: 160, icon: '●' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'rgb(0, 0, 0)' }}
    >
      <div className="p-6 md:p-8 border-b" style={{ borderColor: 'rgb(23, 23, 23)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/map')}
            className="flex items-center gap-2 text-white hover:text-gray-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg tracking-wide">返回</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">家</h1>
          <div className="w-24" />
        </div>
      </div>

      <div className="flex-1 p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <div
            className="relative w-full aspect-[4/3]"
            style={{
              backgroundColor: 'rgb(25, 25, 30)',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '2px solid rgb(50, 50, 60)'
            }}
          >
            {/* 网格地板 */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }}>
              <defs>
                <pattern id="floorGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <rect width="30" height="30" fill="rgb(30, 30, 35)" />
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgb(45, 45, 50)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#floorGrid)" />
            </svg>

            {/* 墙壁 */}
            <div
              className="absolute"
              style={{
                top: 0,
                left: 0,
                right: 0,
                height: '8%',
                backgroundColor: 'rgb(40, 40, 45)',
                borderBottom: '2px solid rgb(60, 60, 65)'
              }}
            />
            <div
              className="absolute"
              style={{
                top: 0,
                bottom: 0,
                left: 0,
                width: '4%',
                backgroundColor: 'rgb(40, 40, 45)',
                borderRight: '2px solid rgb(60, 60, 65)'
              }}
            />
            <div
              className="absolute"
              style={{
                top: 0,
                bottom: 0,
                right: 0,
                width: '4%',
                backgroundColor: 'rgb(40, 40, 45)',
                borderLeft: '2px solid rgb(60, 60, 65)'
              }}
            />
            <div
              className="absolute"
              style={{
                bottom: 0,
                left: 0,
                right: 0,
                height: '8%',
                backgroundColor: 'rgb(40, 40, 45)',
                borderTop: '2px solid rgb(60, 60, 65)'
              }}
            />

            {/* 房间 */}
            {rooms.map((room) => (
              <div
                key={room.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${room.x}%`,
                  top: `${room.y}%`
                }}
                onClick={() => room.id === 'bedroom' && navigate('/bedroom')}
              >
                {/* 房间块 */}
                <div
                  className="relative transition-all duration-300 group-hover:scale-105"
                  style={{
                    width: `${room.size}px`,
                    height: `${room.size * 0.7}px`,
                    backgroundColor: `${room.color}15`,
                    border: `3px solid ${room.color}50`,
                    borderRadius: '12px'
                  }}
                >
                  {/* 房间光晕 */}
                  <div
                    className="absolute -inset-4 rounded-2xl transition-all duration-300"
                    style={{
                      backgroundColor: room.color,
                      opacity: room.id === 'bedroom' ? 0.15 : 0.08,
                      filter: 'blur(12px)'
                    }}
                  />

                  {/* 房间图标 */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-2"
                      style={{ backgroundColor: `${room.color}30` }}
                    >
                      <span
                        style={{
                          color: room.color,
                          fontSize: '24px',
                          fontWeight: 'bold'
                        }}
                      >
                        {room.icon}
                      </span>
                    </div>
                    <span
                      style={{
                        color: room.color,
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      {room.name}
                    </span>
                    {room.id === 'bedroom' && (
                      <span
                        className="text-xs mt-1"
                        style={{ color: `${room.color}80` }}
                      >
                        点击进入
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* 走廊/连接 */}
            <div
              className="absolute"
              style={{
                top: '45%',
                left: '52%',
                width: '15%',
                height: '10%',
                backgroundColor: 'rgb(35, 35, 40)',
                border: '1px dashed rgb(60, 60, 70)',
                borderRadius: '4px'
              }}
            />

            {/* 家具装饰 - 沙发 */}
            <div
              className="absolute"
              style={{
                left: '15%',
                top: '45%',
                width: '15%',
                height: '8%',
                backgroundColor: 'rgb(60, 60, 70)',
                borderRadius: '6px',
                border: '2px solid rgb(80, 80, 90)'
              }}
            />

            {/* 家具装饰 - 桌子 */}
            <div
              className="absolute"
              style={{
                left: '20%',
                top: '60%',
                width: '8%',
                height: '6%',
                backgroundColor: 'rgb(50, 40, 35)',
                borderRadius: '4px'
              }}
            />

            {/* 家具装饰 - 电视 */}
            <div
              className="absolute"
              style={{
                left: '10%',
                top: '30%',
                width: '12%',
                height: '7%',
                backgroundColor: 'rgb(20, 20, 25)',
                border: '2px solid rgb(60, 60, 70)',
                borderRadius: '4px',
                boxShadow: '0 0 20px rgba(100, 150, 200, 0.2)'
              }}
            />
          </div>
        </div>
      </div>

      <div className="p-6 border-t" style={{ borderColor: 'rgb(23, 23, 23)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">点击房间进入</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
