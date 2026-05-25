import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

const BedroomPage = () => {
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
    scene.background = new THREE.Color(0x1a1818);
    sceneRef.current = scene;

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2.5, 8);
    camera.lookAt(0, 1.8, 0);
    cameraRef.current = camera;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 房间
    const roomGroup = new THREE.Group();

    // 地板
    const floorGeometry = new THREE.PlaneGeometry(18, 14);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2222,
      roughness: 0.9
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // 后墙
    const backWallGeometry = new THREE.PlaneGeometry(18, 8);
    const backWallMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e1a1a,
      roughness: 0.95
    });
    const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWall.position.set(0, 4, -7);
    backWall.receiveShadow = true;
    roomGroup.add(backWall);

    // 左墙
    const leftWallGeometry = new THREE.PlaneGeometry(14, 8);
    const leftWall = new THREE.Mesh(leftWallGeometry, backWallMaterial);
    leftWall.position.set(-9, 4, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    roomGroup.add(leftWall);

    // 右墙
    const rightWall = new THREE.Mesh(leftWallGeometry, backWallMaterial);
    rightWall.position.set(9, 4, 0);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.receiveShadow = true;
    roomGroup.add(rightWall);

    // 床
    const bedGroup = new THREE.Group();
    
    // 床架
    const bedBaseGeometry = new THREE.BoxGeometry(4, 0.5, 3.5);
    const bedMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      roughness: 0.7
    });
    const bedBase = new THREE.Mesh(bedBaseGeometry, bedMaterial);
    bedBase.position.set(0, 0.25, -3.5);
    bedBase.castShadow = true;
    bedBase.receiveShadow = true;
    bedGroup.add(bedBase);

    // 床垫
    const mattressGeometry = new THREE.BoxGeometry(3.9, 0.4, 3.4);
    const mattressMaterial = new THREE.MeshStandardMaterial({
      color: 0x555566,
      roughness: 0.5
    });
    const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
    mattress.position.set(0, 0.7, -3.5);
    mattress.castShadow = true;
    mattress.receiveShadow = true;
    bedGroup.add(mattress);

    // 枕头
    const pillowGeometry = new THREE.BoxGeometry(1.4, 0.2, 1);
    const pillowMaterial = new THREE.MeshStandardMaterial({
      color: 0x666677,
      roughness: 0.6
    });
    const pillow1 = new THREE.Mesh(pillowGeometry, pillowMaterial);
    pillow1.position.set(-0.9, 0.95, -4.8);
    pillow1.castShadow = true;
    bedGroup.add(pillow1);
    
    const pillow2 = new THREE.Mesh(pillowGeometry, pillowMaterial);
    pillow2.position.set(0.9, 0.95, -4.8);
    pillow2.castShadow = true;
    bedGroup.add(pillow2);

    // 被子
    const quiltGeometry = new THREE.BoxGeometry(3.6, 0.25, 2.5);
    const quiltMaterial = new THREE.MeshStandardMaterial({
      color: 0xaa6688,
      roughness: 0.4
    });
    const quilt = new THREE.Mesh(quiltGeometry, quiltMaterial);
    quilt.position.set(0, 0.95, -2.8);
    quilt.castShadow = true;
    bedGroup.add(quilt);

    roomGroup.add(bedGroup);

    // 床头柜
    const nightstandGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const nightstandMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a2a1a,
      roughness: 0.6
    });
    const nightstand1 = new THREE.Mesh(nightstandGeometry, nightstandMaterial);
    nightstand1.position.set(-2.8, 0.6, -3.5);
    nightstand1.castShadow = true;
    nightstand1.receiveShadow = true;
    roomGroup.add(nightstand1);

    const nightstand2 = new THREE.Mesh(nightstandGeometry, nightstandMaterial);
    nightstand2.position.set(2.8, 0.6, -3.5);
    nightstand2.castShadow = true;
    nightstand2.receiveShadow = true;
    roomGroup.add(nightstand2);

    // 台灯
    const createLamp = (x: number, z: number) => {
      const lampGroup = new THREE.Group();
      
      // 底座
      const baseGeometry = new THREE.CylinderGeometry(0.25, 0.3, 0.12, 16);
      const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x777777,
        roughness: 0.5
      });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.y = 1.26;
      lampGroup.add(base);

      // 灯杆
      const poleGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8);
      const poleMaterial = new THREE.MeshStandardMaterial({
        color: 0x999999
      });
      const pole = new THREE.Mesh(poleGeometry, poleMaterial);
      pole.position.y = 1.57;
      lampGroup.add(pole);

      // 灯罩
      const shadeGeometry = new THREE.ConeGeometry(0.35, 0.35, 16, 1, true);
      const shadeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffeecc,
        emissive: 0xffeebb,
        emissiveIntensity: 0.6,
        side: THREE.DoubleSide,
        roughness: 0.2
      });
      const shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
      shade.position.y = 1.85;
      shade.rotation.x = Math.PI;
      lampGroup.add(shade);

      lampGroup.position.set(x, 0, z);
      return lampGroup;
    };

    roomGroup.add(createLamp(-2.8, -3.5));
    roomGroup.add(createLamp(2.8, -3.5));

    // 衣柜
    const wardrobeGeometry = new THREE.BoxGeometry(2.5, 3.5, 0.8);
    const wardrobeMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.7
    });
    const wardrobe = new THREE.Mesh(wardrobeGeometry, wardrobeMaterial);
    wardrobe.position.set(-6.5, 1.75, -4);
    wardrobe.castShadow = true;
    wardrobe.receiveShadow = true;
    roomGroup.add(wardrobe);

    // 窗户
    const windowGeometry = new THREE.BoxGeometry(4, 2.5, 0.15);
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x445566,
      emissive: 0x88aacc,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.7,
      roughness: 0.2
    });
    const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
    windowMesh.position.set(0, 4.5, -6.9);
    roomGroup.add(windowMesh);

    // 窗帘
    const curtainGeometry = new THREE.PlaneGeometry(1.8, 2.8);
    const curtainMaterial = new THREE.MeshStandardMaterial({
      color: 0x665566,
      roughness: 0.9,
      side: THREE.DoubleSide
    });
    const curtain1 = new THREE.Mesh(curtainGeometry, curtainMaterial);
    curtain1.position.set(-2.2, 4.5, -6.7);
    roomGroup.add(curtain1);
    
    const curtain2 = new THREE.Mesh(curtainGeometry, curtainMaterial);
    curtain2.position.set(2.2, 4.5, -6.7);
    roomGroup.add(curtain2);

    // 书桌
    const deskGroup = new THREE.Group();
    const deskTopGeometry = new THREE.BoxGeometry(3, 0.12, 1.5);
    const deskMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a2a1a,
      roughness: 0.6
    });
    const deskTop = new THREE.Mesh(deskTopGeometry, deskMaterial);
    deskTop.position.set(6, 1.4, -4);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    deskGroup.add(deskTop);

    // 桌腿
    const deskLegGeometry = new THREE.BoxGeometry(0.12, 1.4, 0.12);
    const deskLegMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a1a0a
    });
    const deskLegPositions = [
      [4.8, 0.7, -4.6],
      [7.2, 0.7, -4.6],
      [4.8, 0.7, -3.4],
      [7.2, 0.7, -3.4]
    ];
    deskLegPositions.forEach(pos => {
      const leg = new THREE.Mesh(deskLegGeometry, deskLegMaterial);
      leg.position.set(pos[0], pos[1], pos[2]);
      leg.castShadow = true;
      deskGroup.add(leg);
    });

    roomGroup.add(deskGroup);

    // 椅子
    const chairGroup = new THREE.Group();
    const chairSeatGeometry = new THREE.BoxGeometry(1, 0.15, 1);
    const chairMaterial = new THREE.MeshStandardMaterial({
      color: 0x333344,
      roughness: 0.7
    });
    const chairSeat = new THREE.Mesh(chairSeatGeometry, chairMaterial);
    chairSeat.position.set(6, 0.6, -1.8);
    chairSeat.castShadow = true;
    chairGroup.add(chairSeat);

    const chairBackGeometry = new THREE.BoxGeometry(1, 1.1, 0.1);
    const chairBack = new THREE.Mesh(chairBackGeometry, chairMaterial);
    chairBack.position.set(6, 1.15, -1.35);
    chairBack.castShadow = true;
    chairGroup.add(chairBack);

    roomGroup.add(chairGroup);

    // 电脑
    const monitorGroup = new THREE.Group();
    const screenGeometry = new THREE.BoxGeometry(1.2, 0.75, 0.06);
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      emissive: 0x5588bb,
      emissiveIntensity: 0.5
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(6, 1.98, -3.8);
    monitorGroup.add(screen);

    const standGeometry = new THREE.BoxGeometry(0.4, 0.25, 0.3);
    const standMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444
    });
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.set(6, 1.53, -3.8);
    monitorGroup.add(stand);

    roomGroup.add(monitorGroup);

    scene.add(roomGroup);

    // ====== 光照系统 ======
    // 主环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // 主顶灯 - 强烈
    const ceilingLight = new THREE.PointLight(0xffffee, 2.5, 25);
    ceilingLight.position.set(0, 6.5, 0);
    ceilingLight.castShadow = true;
    ceilingLight.shadow.mapSize.width = 2048;
    ceilingLight.shadow.mapSize.height = 2048;
    ceilingLight.shadow.bias = -0.001;
    scene.add(ceilingLight);

    // 左侧台灯光源 - 暖光
    const lampLight1 = new THREE.PointLight(0xffeedd, 2, 8);
    lampLight1.position.set(-2.8, 2.2, -3.5);
    scene.add(lampLight1);

    // 右侧台灯光源 - 暖光
    const lampLight2 = new THREE.PointLight(0xffeedd, 2, 8);
    lampLight2.position.set(2.8, 2.2, -3.5);
    scene.add(lampLight2);

    // 窗户月光
    const windowLight = new THREE.PointLight(0xaaddff, 1.2, 15);
    windowLight.position.set(0, 4.5, -6);
    scene.add(windowLight);

    // 电脑屏幕光
    const monitorLight = new THREE.PointLight(0x88bbff, 1.5, 5);
    monitorLight.position.set(6, 1.9, -3.3);
    scene.add(monitorLight);

    // 辅助光源 - 填补阴影
    const fillLight1 = new THREE.PointLight(0xffffff, 0.6, 20);
    fillLight1.position.set(-7, 4, 3);
    scene.add(fillLight1);

    const fillLight2 = new THREE.PointLight(0xffffff, 0.6, 20);
    fillLight2.position.set(7, 4, 3);
    scene.add(fillLight2);

    // 鼠标控制
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationY = 0;
    let rotationX = 0.15;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotationY += deltaX * 0.01;
      rotationX = Math.max(-0.4, Math.min(0.5, rotationX + deltaY * 0.01));

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
      rotationX = Math.max(-0.4, Math.min(0.5, rotationX + deltaY * 0.01));

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

      const radius = 8;
      camera.position.x = Math.sin(rotationY) * radius * Math.cos(rotationX);
      camera.position.y = 2.5 + Math.sin(rotationX) * radius * 0.4;
      camera.position.z = Math.cos(rotationY) * radius * Math.cos(rotationX);
      camera.lookAt(0, 1.8, 0);

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

    // 清理
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
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-white hover:text-gray-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg tracking-wide">返回</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">卧室</h1>
          <div className="w-24" />
        </div>
      </div>

      {/* 底部提示 */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">拖动旋转视角，查看你的温馨小窝</p>
        </div>
      </div>
    </div>
  );
};

export default BedroomPage;
