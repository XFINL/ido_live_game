import { useNavigate } from 'react-router-dom';

const MapPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'rgb(0, 0, 0)' }}
    >
      {/* 顶部导航 */}
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

      {/* 地图内容 */}
      <div className="flex-1 p-6 md:p-12 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {/* CSS绘制的地图 */}
          <div
            className="relative w-full aspect-square"
            style={{
              backgroundColor: 'rgb(25, 25, 25)',
              borderRadius: '24px',
              overflow: 'hidden'
            }}
          >
            {/* 道路网络 */}
            <div
              className="absolute"
              style={{
                top: '50%',
                left: '0',
                right: '0',
                height: '40px',
                backgroundColor: 'rgb(45, 45, 45)',
                transform: 'translateY(-50%)'
              }}
            />
            <div
              className="absolute"
              style={{
                left: '50%',
                top: '0',
                bottom: '0',
                width: '40px',
                backgroundColor: 'rgb(45, 45, 45)',
                transform: 'translateX(-50%)'
              }}
            />

            {/* 家的建筑 */}
            <div
              className="absolute cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate('/home')}
              style={{
                top: '25%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '220px'
              }}
            >
              {/* 墙体 */}
              <div
                className="w-full h-full relative"
                style={{
                  backgroundColor: 'rgb(35, 35, 35)',
                  borderRadius: '12px',
                  border: '2px solid rgb(50, 50, 50)'
                }}
              >
                {/* 屋顶 */}
                <div
                  className="absolute"
                  style={{
                    top: '-40px',
                    left: '-10px',
                    right: '-10px',
                    height: '50px',
                    backgroundColor: 'rgb(55, 55, 55)',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                  }}
                />

                {/* 门 */}
                <div
                  className="absolute"
                  style={{
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '100px',
                    backgroundColor: 'rgb(70, 50, 30)',
                    borderRadius: '8px 8px 0 0',
                    boxShadow: '0 0 30px rgba(255, 170, 68, 0.4)'
                  }}
                >
                  <div
                    className="absolute"
                    style={{
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '10px',
                      height: '10px',
                      backgroundColor: 'rgb(200, 150, 80)',
                      borderRadius: '50%'
                    }}
                  />
                </div>

                {/* 窗户 */}
                <div
                  className="absolute"
                  style={{
                    top: '50px',
                    left: '25px',
                    width: '45px',
                    height: '55px',
                    backgroundColor: 'rgb(50, 70, 100)',
                    borderRadius: '4px',
                    boxShadow: '0 0 20px rgba(100, 150, 200, 0.3)'
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    top: '50px',
                    right: '25px',
                    width: '45px',
                    height: '55px',
                    backgroundColor: 'rgb(50, 70, 100)',
                    borderRadius: '4px',
                    boxShadow: '0 0 20px rgba(100, 150, 200, 0.3)'
                  }}
                />

                {/* 门牌号 */}
                <div
                  className="absolute"
                  style={{
                    top: '15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '4px 12px',
                    backgroundColor: 'rgba(100, 80, 50, 0.8)',
                    borderRadius: '4px',
                    color: 'rgb(220, 200, 160)',
                    fontSize: '12px',
                    letterSpacing: '2px'
                  }}
                >
                  HOME
                </div>
              </div>

              {/* 点击提示 */}
              <div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}
              >
                点击进入
              </div>
            </div>

            {/* 装饰性树木 */}
            {[
              { left: '10%', top: '15%' },
              { left: '85%', top: '20%' },
              { left: '15%', top: '80%' },
              { left: '80%', top: '85%' },
              { left: '10%', top: '55%' },
              { left: '88%', top: '50%' }
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: '30px',
                  height: '40px'
                }}
              >
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                  style={{
                    width: '8px',
                    height: '15px',
                    backgroundColor: 'rgb(40, 30, 20)'
                  }}
                />
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2"
                  style={{
                    width: '26px',
                    height: '26px',
                    backgroundColor: 'rgb(25, 50, 25)',
                    borderRadius: '50%'
                  }}
                />
              </div>
            ))}

            {/* 道路装饰线 */}
            <div
              className="absolute"
              style={{
                top: '50%',
                left: '0',
                right: '0',
                height: '2px',
                transform: 'translateY(-50%)',
                backgroundImage: 'repeating-linear-gradient(90deg, rgb(80, 80, 80) 0, rgb(80, 80, 80) 20px, transparent 20px, transparent 40px)'
              }}
            />
            <div
              className="absolute"
              style={{
                left: '50%',
                top: '0',
                bottom: '0',
                width: '2px',
                transform: 'translateX(-50%)',
                backgroundImage: 'repeating-linear-gradient(180deg, rgb(80, 80, 80) 0, rgb(80, 80, 80) 20px, transparent 20px, transparent 40px)'
              }}
            />
          </div>
        </div>
      </div>

      {/* 底部提示 */}
      <div className="p-6 border-t" style={{ borderColor: 'rgb(23, 23, 23)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">探索城市地图，找到回家的路</p>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
