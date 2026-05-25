import { useNavigate } from 'react-router-dom';

const HomePage = () => {
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

      {/* 家的内容 */}
      <div className="flex-1 p-6 md:p-12">
        <div className="max-w-5xl mx-auto">
          {/* CSS绘制的家 */}
          <div
            className="relative w-full aspect-[4/3]"
            style={{
              backgroundColor: 'rgb(20, 20, 20)',
              borderRadius: '24px',
              overflow: 'hidden'
            }}
          >
            {/* 地板 */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: '40%',
                backgroundColor: 'rgb(35, 35, 35)',
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(50,50,50,0.5) 40px, rgba(50,50,50,0.5) 42px)'
              }}
            />

            {/* 墙壁 */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: '60%',
                backgroundColor: 'rgb(25, 25, 25)'
              }}
            />

            {/* 客厅沙发 */}
            <div
              className="absolute"
              style={{
                bottom: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '50%'
              }}
            >
              {/* 沙发座 */}
              <div
                className="w-full"
                style={{
                  height: '60px',
                  backgroundColor: 'rgb(50, 50, 60)',
                  borderRadius: '12px 12px 0 0'
                }}
              />
              {/* 沙发靠背 */}
              <div
                className="w-full"
                style={{
                  height: '80px',
                  marginTop: '-8px',
                  backgroundColor: 'rgb(45, 45, 55)',
                  borderRadius: '8px 8px 0 0'
                }}
              />
            </div>

            {/* 茶几 */}
            <div
              className="absolute"
              style={{
                bottom: '28%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '25%',
                height: '40px',
                backgroundColor: 'rgb(45, 35, 25)',
                borderRadius: '8px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.5)'
              }}
            />

            {/* 卧室门 */}
            <div
              className="absolute cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate('/bedroom')}
              style={{
                top: '15%',
                left: '10%',
                width: '120px',
                height: '180px'
              }}
            >
              {/* 门 */}
              <div
                className="w-full h-full relative"
                style={{
                  backgroundColor: 'rgb(60, 45, 30)',
                  borderRadius: '12px 12px 0 0',
                  boxShadow: '0 0 40px rgba(255, 200, 150, 0.4), inset 0 0 60px rgba(255, 220, 180, 0.1)'
                }}
              >
                {/* 门把手 */}
                <div
                  className="absolute"
                  style={{
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '14px',
                    height: '14px',
                    backgroundColor: 'rgb(180, 150, 100)',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px rgba(255, 220, 180, 0.5)'
                  }}
                />
                {/* 门框发光 */}
                <div
                  className="absolute -inset-2"
                  style={{
                    borderRadius: '14px 14px 0 0',
                    border: '2px solid rgba(255, 200, 150, 0.3)',
                    pointerEvents: 'none'
                  }}
                />
              </div>
              {/* 门标签 */}
              <div
                className="text-center mt-3"
                style={{
                  color: 'rgba(255, 220, 180, 0.8)',
                  fontSize: '14px',
                  letterSpacing: '2px'
                }}
              >
                卧室
              </div>
            </div>

            {/* 楼梯 */}
            <div
              className="absolute"
              style={{
                bottom: '0',
                right: '10%',
                width: '200px'
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    bottom: `${i * 4.5}%`,
                    right: `${i * 2.5}%`,
                    width: `${100 - i * 10}%`,
                    height: '25px',
                    backgroundColor: `rgb(${40 + i * 2}, ${40 + i * 2}, ${40 + i * 2})`,
                    borderTop: '2px solid rgba(60,60,60,0.5)'
                  }}
                />
              ))}
            </div>

            {/* 顶灯 */}
            <div
              className="absolute"
              style={{
                top: '5%',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '20px',
                  backgroundColor: 'rgb(70, 70, 70)',
                  borderRadius: '0 0 30px 30px',
                  boxShadow: '0 20px 60px rgba(255, 255, 255, 0.4), 0 0 100px rgba(255, 255, 255, 0.2)'
                }}
              />
              {/* 灯光效果 */}
              <div
                className="absolute"
                style={{
                  top: '15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '0',
                  height: '0',
                  borderLeft: '120px solid transparent',
                  borderRight: '120px solid transparent',
                  borderTop: '180px solid rgba(255, 255, 240, 0.08)',
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 底部提示 */}
      <div className="p-6 border-t" style={{ borderColor: 'rgb(23, 23, 23)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">点击卧室门进入你的房间</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
