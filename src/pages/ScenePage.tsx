import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

const ScenePage = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 创建场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 1.5, 0);
    cameraRef.current = camera;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 创建房间
    const roomGroup = new THREE.Group();

    // 地板
    const floorGeometry = new THREE.PlaneGeometry(12, 10);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.8,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // 后墙
    const backWallGeometry = new THREE.PlaneGeometry(12, 6);
    const backWallMaterial = new THREE.MeshStandardMaterial({
      color: 0x171717,
      roughness: 0.9,
    });
    const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWall.position.set(0, 3, -5);
    backWall.receiveShadow = true;
    roomGroup.add(backWall);

    // 左墙
    const leftWallGeometry = new THREE.PlaneGeometry(10, 6);
    const leftWall = new THREE.Mesh(leftWallGeometry, backWallMaterial);
    leftWall.position.set(-6, 3, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    roomGroup.add(leftWall);

    // 右墙
    const rightWall = new THREE.Mesh(leftWallGeometry, backWallMaterial);
    rightWall.position.set(6, 3, 0);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.receiveShadow = true;
    roomGroup.add(rightWall);

    // 床
    const bedGroup = new THREE.Group();

    // 床架
    const bedBaseGeometry = new THREE.BoxGeometry(2.5, 0.3, 3.5);
    const bedMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.7,
    });
    const bedBase = new THREE.Mesh(bedBaseGeometry, bedMaterial);
    bedBase.position.set(0, 0.15, -3);
    bedBase.castShadow = true;
    bedBase.receiveShadow = true;
    bedGroup.add(bedBase);

    // 床垫
    const mattressGeometry = new THREE.BoxGeometry(2.4, 0.2, 3.4);
    const mattressMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.5,
    });
    const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
    mattress.position.set(0, 0.4, -3);
    mattress.castShadow = true;
    mattress.receiveShadow = true;
    bedGroup.add(mattress);

    // 枕头
    const pillowGeometry = new THREE.BoxGeometry(1.2, 0.15, 0.6);
    const pillowMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.6,
    });
    const pillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
    pillow.position.set(0, 0.58, -4.2);
    pillow.castShadow = true;
    pillow.receiveShadow = true;
    bedGroup.add(pillow);

    roomGroup.add(bedGroup);

    // 书桌
    const deskGroup = new THREE.Group();

    // 桌面
    const deskTopGeometry = new THREE.BoxGeometry(3, 0.1, 1.5);
    const deskMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      roughness: 0.6,
    });
    const deskTop = new THREE.Mesh(deskTopGeometry, deskMaterial);
    deskTop.position.set(-4, 1, -3.5);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    deskGroup.add(deskTop);

    // 桌腿
    const legGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);
    const legMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
    });
    const positions = [
      [-5.3, 0.5, -4.1],
      [-2.7, 0.5, -4.1],
      [-5.3, 0.5, -2.9],
      [-2.7, 0.5, -2.9],
    ];
    positions.forEach(pos => {
      const leg = new THREE.Mesh(legGeometry, legMaterial);
      leg.position.set(pos[0], pos[1], pos[2]);
      leg.castShadow = true;
      deskGroup.add(leg);
    });

    roomGroup.add(deskGroup);

    // 电脑显示器
    const monitorGroup = new THREE.Group();
    const screenGeometry = new THREE.BoxGeometry(1.2, 0.7, 0.05);
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      emissive: 0x222244,
      emissiveIntensity: 0.3,
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(-4, 1.55, -3.8);
    monitorGroup.add(screen);

    // 显示器底座
    const standGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.2);
    const standMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.set(-4, 1.1, -3.8);
    monitorGroup.add(stand);

    roomGroup.add(monitorGroup);

    // 椅子
    const chairGroup = new THREE.Group();

    // 座椅
    const seatGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.6);
    const chairMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.7,
    });
    const seat = new THREE.Mesh(seatGeometry, chairMaterial);
    seat.position.set(-4, 0.5, -2);
    seat.castShadow = true;
    chairGroup.add(seat);

    // 椅背
    const backGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.08);
    const back = new THREE.Mesh(backGeometry, chairMaterial);
    back.position.set(-4, 0.95, -1.65);
    back.castShadow = true;
    chairGroup.add(back);

    roomGroup.add(chairGroup);

    // 衣柜
    const wardrobeGroup = new THREE.Group();
    const wardrobeGeometry = new THREE.BoxGeometry(2, 3, 0.5);
    const wardrobeMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.6,
    });
    const wardrobe = new THREE.Mesh(wardrobeGeometry, wardrobeMaterial);
    wardrobe.position.set(4, 1.5, -4.5);
    wardrobe.castShadow = true;
    wardrobe.receiveShadow = true;
    wardrobeGroup.add(wardrobe);

    // 衣柜把手
    const handleGeometry = new THREE.BoxGeometry(0.05, 0.15, 0.02);
    const handleMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
    const handle1 = new THREE.Mesh(handleGeometry, handleMaterial);
    handle1.position.set(3.55, 1.5, -4.23);
    wardrobeGroup.add(handle1);
    const handle2 = new THREE.Mesh(handleGeometry, handleMaterial);
    handle2.position.set(4.45, 1.5, -4.23);
    wardrobeGroup.add(handle2);

    roomGroup.add(wardrobeGroup);

    // 台灯
    const lampGroup = new THREE.Group();

    // 灯座
    const baseGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.08, 16);
    const lampMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const base = new THREE.Mesh(baseGeometry, lampMaterial);
    base.position.set(-4, 1.08, -3.3);
    lampGroup.add(base);

    // 灯杆
    const poleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
    const pole = new THREE.Mesh(poleGeometry, lampMaterial);
    pole.position.set(-4, 1.38, -3.3);
    lampGroup.add(pole);

    // 灯罩
    const shadeGeometry = new THREE.ConeGeometry(0.25, 0.25, 16, 1, true);
    const shadeMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      side: THREE.DoubleSide,
    });
    const shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
    shade.position.set(-4, 1.73, -3.3);
    shade.rotation.x = Math.PI;
    lampGroup.add(shade);

    roomGroup.add(lampGroup);

    scene.add(roomGroup);

    // 主光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // 顶灯
    const ceilingLight = new THREE.PointLight(0xffffff, 1, 20);
    ceilingLight.position.set(0, 5.5, 0);
    ceilingLight.castShadow = true;
    scene.add(ceilingLight);

    // 台灯光源
    const deskLamp = new THREE.PointLight(0xffffaa, 0.5, 5);
    deskLamp.position.set(-4, 1.65, -3.3);
    scene.add(deskLamp);

    // 鼠标控制变量
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationY = 0;
    let rotationX = 0.3;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotationY += deltaX * 0.01;
      rotationX = Math.max(-0.5, Math.min(0.8, rotationX + deltaY * 0.01));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // 触摸控制
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const deltaX = e.touches[0].clientX - touchStartX;
      const deltaY = e.touches[0].clientY - touchStartY;

      rotationY += deltaX * 0.01;
      rotationX = Math.max(-0.5, Math.min(0.8, rotationX + deltaY * 0.01));

      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // 动画循环
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // 更新相机位置
      const radius = 8;
      camera.position.x = Math.sin(rotationY) * radius * Math.cos(rotationX);
      camera.position.y = 2 + Math.sin(rotationX) * 3;
      camera.position.z = Math.cos(rotationY) * radius * Math.cos(rotationX);
      camera.lookAt(0, 1.5, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 窗口调整
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen" style={{ backgroundColor: 'rgb(0, 0, 0)' }}>
      {/* 3D场景容器 */}
      <div ref={containerRef} className="w-full h-full" />

      {/* 顶部导航覆盖层 */}
      <div className="absolute top-0 left-0 right-0 p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/main')}
            className="flex items-center gap-2 text-white hover:text-gray-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg tracking-wide">返回</span>
          </button>
        </div>
      </div>

      {/* 底部信息覆盖层 */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">房间</h1>
              <p className="text-gray-500 text-sm">拖动旋转视角</p>
            </div>
            <div className="text-right">
              <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">场景</div>
              <div className="text-gray-400 text-sm">你的私人空间</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenePage;
