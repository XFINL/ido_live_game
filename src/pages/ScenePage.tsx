import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

const ScenePage = () => {
  const navigate = useNavigate();
  const [sceneLevel, setSceneLevel] = useState<'map' | 'home' | 'bedroom'>('map');
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
    cameraRef.current = camera;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const cleanupCurrentScene = () => {
      while (scene.children.length > 0) {
        const child = scene.children[0];
        if ((child as any).isGroup) {
          const group = child as THREE.Group;
          while (group.children.length > 0) {
            const obj = group.children[0];
            if ('geometry' in obj) {
              (obj as any).geometry.dispose();
            }
            if ('material' in obj) {
              if (Array.isArray((obj as any).material)) {
                (obj as any).material.forEach((mat: any) => mat.dispose());
              } else {
                (obj as any).material.dispose();
              }
            }
            group.remove(obj);
          }
        }
        scene.remove(child);
      }
    };

    const setupMapScene = () => {
      cleanupCurrentScene();
      camera.position.set(0, 50, 50);
      camera.lookAt(0, 0, 0);

      // 地面
      const groundGeometry = new THREE.PlaneGeometry(200, 200);
      const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.9,
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);

      // 道路
      const roadGeometry = new THREE.PlaneGeometry(8, 200);
      const roadMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.8,
      });
      const road1 = new THREE.Mesh(roadGeometry, roadMaterial);
      road1.rotation.x = -Math.PI / 2;
      road1.position.z = -40;
      road1.receiveShadow = true;
      scene.add(road1);

      const road2 = new THREE.Mesh(roadGeometry, roadMaterial);
      road2.rotation.x = -Math.PI / 2;
      road2.rotation.z = Math.PI / 2;
      road2.position.x = -40;
      road2.receiveShadow = true;
      scene.add(road2);

      // 家的建筑
      const houseGroup = new THREE.Group();
      
      const houseBaseGeometry = new THREE.BoxGeometry(30, 15, 25);
      const houseMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        roughness: 0.7,
      });
      const houseBase = new THREE.Mesh(houseBaseGeometry, houseMaterial);
      houseBase.position.set(0, 7.5, 0);
      houseBase.castShadow = true;
      houseBase.receiveShadow = true;
      houseGroup.add(houseBase);

      // 屋顶
      const roofGeometry = new THREE.ConeGeometry(22, 10, 4);
      const roofMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        roughness: 0.8,
      });
      const roof = new THREE.Mesh(roofGeometry, roofMaterial);
      roof.position.set(0, 20, 0);
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      houseGroup.add(roof);

      // 门
      const doorGeometry = new THREE.BoxGeometry(5, 8, 1);
      const doorMaterial = new THREE.MeshStandardMaterial({
        color: 0x664422,
        roughness: 0.6,
        emissive: 0xffaa44,
        emissiveIntensity: 0.2,
      });
      const door = new THREE.Mesh(doorGeometry, doorMaterial);
      door.position.set(0, 4, 12.6);
      houseGroup.add(door);

      // 窗户
      const windowGeometry = new THREE.BoxGeometry(4, 3, 0.5);
      const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0x4466aa,
        emissive: 0x6699cc,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.7,
      });
      const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
      window1.position.set(-8, 10, 12.5);
      houseGroup.add(window1);
      const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
      window2.position.set(8, 10, 12.5);
      houseGroup.add(window2);

      // 门牌号
      const signGeometry = new THREE.BoxGeometry(3, 1.5, 0.2);
      const signMaterial = new THREE.MeshStandardMaterial({
        color: 0x886633,
        emissive: 0xffcc88,
        emissiveIntensity: 0.1,
      });
      const sign = new THREE.Mesh(signGeometry, signMaterial);
      sign.position.set(0, 13, 12.8);
      houseGroup.add(sign);

      scene.add(houseGroup);

      // 一些树作为装饰
      for (let i = 0; i < 8; i++) {
        const treeGroup = new THREE.Group();
        const trunkGeometry = new THREE.CylinderGeometry(0.8, 1.2, 5, 8);
        const trunkMaterial = new THREE.MeshStandardMaterial({
          color: 0x3a2211,
          roughness: 0.9,
        });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 2.5;
        trunk.castShadow = true;
        treeGroup.add(trunk);

        const leavesGeometry = new THREE.SphereGeometry(4, 8, 8);
        const leavesMaterial = new THREE.MeshStandardMaterial({
          color: 0x1a441a,
          roughness: 0.8,
        });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.y = 7;
        leaves.castShadow = true;
        treeGroup.add(leaves);

        const angle = (i / 8) * Math.PI * 2;
        const radius = 50 + Math.random() * 20;
        treeGroup.position.set(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        );
        scene.add(treeGroup);
      }

      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      // 主光源
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(50, 80, 50);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 200;
      directionalLight.shadow.camera.left = -100;
      directionalLight.shadow.camera.right = 100;
      directionalLight.shadow.camera.top = 100;
      directionalLight.shadow.camera.bottom = -100;
      scene.add(directionalLight);
    };

    const setupHomeScene = () => {
      cleanupCurrentScene();
      camera.position.set(0, 5, 15);
      camera.lookAt(0, 3, 0);

      // 地板
      const floorGeometry = new THREE.PlaneGeometry(40, 40);
      const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.8,
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      scene.add(floor);

      // 墙壁
      const wallGeometry = new THREE.BoxGeometry(40, 15, 1);
      const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.9,
      });
      
      const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
      backWall.position.set(0, 7.5, -20);
      backWall.receiveShadow = true;
      scene.add(backWall);

      const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
      leftWall.position.set(-20, 7.5, 0);
      leftWall.rotation.y = Math.PI / 2;
      leftWall.receiveShadow = true;
      scene.add(leftWall);

      const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
      rightWall.position.set(20, 7.5, 0);
      rightWall.rotation.y = -Math.PI / 2;
      rightWall.receiveShadow = true;
      scene.add(rightWall);

      // 楼梯
      const stairGroup = new THREE.Group();
      for (let i = 0; i < 10; i++) {
        const stepGeometry = new THREE.BoxGeometry(8, 0.5, 3);
        const stepMaterial = new THREE.MeshStandardMaterial({
          color: 0x333333,
          roughness: 0.7,
        });
        const step = new THREE.Mesh(stepGeometry, stepMaterial);
        step.position.set(12, 0.25 + i * 0.5, -10 - i * 2);
        step.castShadow = true;
        step.receiveShadow = true;
        stairGroup.add(step);
      }
      scene.add(stairGroup);

      // 卧室门
      const bedroomDoorGroup = new THREE.Group();
      const bedroomDoorGeometry = new THREE.BoxGeometry(4, 6, 0.3);
      const bedroomDoorMaterial = new THREE.MeshStandardMaterial({
        color: 0x553311,
        roughness: 0.6,
        emissive: 0xffcc99,
        emissiveIntensity: 0.15,
      });
      const bedroomDoor = new THREE.Mesh(bedroomDoorGeometry, bedroomDoorMaterial);
      bedroomDoor.position.set(-10, 3, -19.7);
      bedroomDoorGroup.add(bedroomDoor);

      // 门框发光
      const doorFrameGeometry = new THREE.BoxGeometry(4.4, 6.4, 0.1);
      const doorFrameMaterial = new THREE.MeshStandardMaterial({
        color: 0xffaa66,
        emissive: 0xffcc99,
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 0.5,
      });
      const doorFrame = new THREE.Mesh(doorFrameGeometry, doorFrameMaterial);
      doorFrame.position.set(-10, 3, -19.5);
      bedroomDoorGroup.add(doorFrame);

      scene.add(bedroomDoorGroup);

      // 客厅沙发
      const sofaGroup = new THREE.Group();
      const sofaBaseGeometry = new THREE.BoxGeometry(10, 2, 5);
      const sofaMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a3a4a,
        roughness: 0.7,
      });
      const sofaBase = new THREE.Mesh(sofaBaseGeometry, sofaMaterial);
      sofaBase.position.set(0, 1, 0);
      sofaBase.castShadow = true;
      sofaBase.receiveShadow = true;
      sofaGroup.add(sofaBase);

      const sofaBackGeometry = new THREE.BoxGeometry(10, 4, 1.5);
      const sofaBack = new THREE.Mesh(sofaBackGeometry, sofaMaterial);
      sofaBack.position.set(0, 3, -1.5);
      sofaBack.castShadow = true;
      sofaGroup.add(sofaBack);
      scene.add(sofaGroup);

      // 茶几
      const tableGeometry = new THREE.BoxGeometry(4, 1, 2);
      const tableMaterial = new THREE.MeshStandardMaterial({
        color: 0x332211,
        roughness: 0.6,
      });
      const table = new THREE.Mesh(tableGeometry, tableMaterial);
      table.position.set(0, 0.5, 4);
      table.castShadow = true;
      table.receiveShadow = true;
      scene.add(table);

      // 吊灯
      const chandelierGroup = new THREE.Group();
      const chandelierBaseGeometry = new THREE.CylinderGeometry(1.5, 1, 0.5, 16);
      const chandelierBaseMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        roughness: 0.8,
      });
      const chandelierBase = new THREE.Mesh(chandelierBaseGeometry, chandelierBaseMaterial);
      chandelierBase.position.y = 14.5;
      chandelierGroup.add(chandelierBase);

      const chandelierRodGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
      const chandelierRodMaterial = new THREE.MeshStandardMaterial({
        color: 0x666666,
      });
      const chandelierRod = new THREE.Mesh(chandelierRodGeometry, chandelierRodMaterial);
      chandelierRod.position.y = 14;
      chandelierGroup.add(chandelierRod);

      scene.add(chandelierGroup);

      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // 吊灯光源
      const ceilingLight = new THREE.PointLight(0xffffff, 1.2, 60);
      ceilingLight.position.set(0, 13, 0);
      ceilingLight.castShadow = true;
      ceilingLight.shadow.mapSize.width = 1024;
      ceilingLight.shadow.mapSize.height = 1024;
      scene.add(ceilingLight);

      // 卧室方向的补光
      const bedroomLight = new THREE.PointLight(0xffcc99, 0.6, 30);
      bedroomLight.position.set(-10, 5, -18);
      scene.add(bedroomLight);
    };

    const setupBedroomScene = () => {
      cleanupCurrentScene();
      camera.position.set(0, 3, 10);
      camera.lookAt(0, 2, 0);

      const roomGroup = new THREE.Group();

      // 地板
      const floorGeometry = new THREE.PlaneGeometry(25, 20);
      const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2222,
        roughness: 0.8,
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      roomGroup.add(floor);

      // 墙壁
      const wallGeometry = new THREE.BoxGeometry(25, 12, 1);
      const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1818,
        roughness: 0.9,
      });
      
      const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
      backWall.position.set(0, 6, -10);
      backWall.receiveShadow = true;
      roomGroup.add(backWall);

      const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
      leftWall.position.set(-12.5, 6, 0);
      leftWall.rotation.y = Math.PI / 2;
      leftWall.receiveShadow = true;
      roomGroup.add(leftWall);

      const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
      rightWall.position.set(12.5, 6, 0);
      rightWall.rotation.y = -Math.PI / 2;
      rightWall.receiveShadow = true;
      roomGroup.add(rightWall);

      // 床
      const bedGroup = new THREE.Group();
      const bedBaseGeometry = new THREE.BoxGeometry(8, 0.8, 6);
      const bedMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a3a3a,
        roughness: 0.7,
      });
      const bedBase = new THREE.Mesh(bedBaseGeometry, bedMaterial);
      bedBase.position.set(0, 0.4, -5);
      bedBase.castShadow = true;
      bedBase.receiveShadow = true;
      bedGroup.add(bedBase);

      const mattressGeometry = new THREE.BoxGeometry(7.8, 0.6, 5.8);
      const mattressMaterial = new THREE.MeshStandardMaterial({
        color: 0x555566,
        roughness: 0.6,
      });
      const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
      mattress.position.set(0, 1.1, -5);
      mattress.castShadow = true;
      mattress.receiveShadow = true;
      bedGroup.add(mattress);

      const pillowGeometry = new THREE.BoxGeometry(3.5, 0.3, 1.8);
      const pillowMaterial = new THREE.MeshStandardMaterial({
        color: 0x666677,
        roughness: 0.7,
      });
      const pillow1 = new THREE.Mesh(pillowGeometry, pillowMaterial);
      pillow1.position.set(-1.8, 1.55, -7.3);
      pillow1.castShadow = true;
      bedGroup.add(pillow1);
      const pillow2 = new THREE.Mesh(pillowGeometry, pillowMaterial);
      pillow2.position.set(1.8, 1.55, -7.3);
      pillow2.castShadow = true;
      bedGroup.add(pillow2);

      const quiltGeometry = new THREE.BoxGeometry(7, 0.4, 4);
      const quiltMaterial = new THREE.MeshStandardMaterial({
        color: 0xaa6688,
        roughness: 0.5,
        emissive: 0x442233,
        emissiveIntensity: 0.05,
      });
      const quilt = new THREE.Mesh(quiltGeometry, quiltMaterial);
      quilt.position.set(0, 1.45, -4);
      quilt.castShadow = true;
      bedGroup.add(quilt);

      roomGroup.add(bedGroup);

      // 床头柜
      const nightstandGeometry = new THREE.BoxGeometry(2, 2, 2);
      const nightstandMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a2a1a,
        roughness: 0.6,
      });
      const nightstand1 = new THREE.Mesh(nightstandGeometry, nightstandMaterial);
      nightstand1.position.set(-5, 1, -5);
      nightstand1.castShadow = true;
      nightstand1.receiveShadow = true;
      roomGroup.add(nightstand1);

      const nightstand2 = new THREE.Mesh(nightstandGeometry, nightstandMaterial);
      nightstand2.position.set(5, 1, -5);
      nightstand2.castShadow = true;
      nightstand2.receiveShadow = true;
      roomGroup.add(nightstand2);

      // 台灯
      const createLamp = (x: number, z: number) => {
        const lampGroup = new THREE.Group();
        const lampBaseGeometry = new THREE.CylinderGeometry(0.4, 0.5, 0.2, 12);
        const lampBaseMaterial = new THREE.MeshStandardMaterial({
          color: 0x555555,
          roughness: 0.8,
        });
        const lampBase = new THREE.Mesh(lampBaseGeometry, lampBaseMaterial);
        lampBase.position.y = 2.1;
        lampGroup.add(lampBase);

        const lampRodGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8);
        const lampRodMaterial = new THREE.MeshStandardMaterial({
          color: 0x777777,
        });
        const lampRod = new THREE.Mesh(lampRodGeometry, lampRodMaterial);
        lampRod.position.y = 2.6;
        lampGroup.add(lampRod);

        const lampShadeGeometry = new THREE.ConeGeometry(0.5, 0.5, 12, 1, true);
        const lampShadeMaterial = new THREE.MeshStandardMaterial({
          color: 0xddddaa,
          emissive: 0xffeecc,
          emissiveIntensity: 0.3,
          side: THREE.DoubleSide,
          roughness: 0.4,
        });
        const lampShade = new THREE.Mesh(lampShadeGeometry, lampShadeMaterial);
        lampShade.position.y = 3;
        lampShade.rotation.x = Math.PI;
        lampGroup.add(lampShade);

        lampGroup.position.set(x, 0, z);
        return lampGroup;
      };

      roomGroup.add(createLamp(-5, -5));
      roomGroup.add(createLamp(5, -5));

      // 衣柜
      const wardrobeGeometry = new THREE.BoxGeometry(5, 7, 1.5);
      const wardrobeMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        roughness: 0.7,
      });
      const wardrobe = new THREE.Mesh(wardrobeGeometry, wardrobeMaterial);
      wardrobe.position.set(-10, 3.5, -5);
      wardrobe.castShadow = true;
      wardrobe.receiveShadow = true;
      roomGroup.add(wardrobe);

      // 窗户
      const windowGeometry = new THREE.BoxGeometry(6, 4, 0.3);
      const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0x446688,
        emissive: 0x66aacc,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.6,
        roughness: 0.3,
      });
      const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
      windowMesh.position.set(0, 6, -9.85);
      roomGroup.add(windowMesh);

      // 窗帘
      const curtainGeometry = new THREE.PlaneGeometry(8, 5);
      const curtainMaterial = new THREE.MeshStandardMaterial({
        color: 0x664455,
        roughness: 0.9,
        side: THREE.DoubleSide,
      });
      const curtain1 = new THREE.Mesh(curtainGeometry, curtainMaterial);
      curtain1.position.set(-3.5, 6, -9.5);
      roomGroup.add(curtain1);
      const curtain2 = new THREE.Mesh(curtainGeometry, curtainMaterial);
      curtain2.position.set(3.5, 6, -9.5);
      roomGroup.add(curtain2);

      // 书桌
      const deskGroup = new THREE.Group();
      const deskTopGeometry = new THREE.BoxGeometry(5, 0.15, 2.5);
      const deskMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a2a1a,
        roughness: 0.6,
      });
      const deskTop = new THREE.Mesh(deskTopGeometry, deskMaterial);
      deskTop.position.set(10, 1.5, -5);
      deskTop.castShadow = true;
      deskTop.receiveShadow = true;
      deskGroup.add(deskTop);

      const deskLegGeometry = new THREE.BoxGeometry(0.2, 1.5, 0.2);
      const deskLegMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a1a0a,
      });
      const deskLegPositions = [
        [8, 0.75, -6], [12, 0.75, -6], [8, 0.75, -4], [12, 0.75, -4]
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
      const chairSeatGeometry = new THREE.BoxGeometry(1.5, 0.2, 1.5);
      const chairMaterial = new THREE.MeshStandardMaterial({
        color: 0x333344,
        roughness: 0.7,
      });
      const chairSeat = new THREE.Mesh(chairSeatGeometry, chairMaterial);
      chairSeat.position.set(10, 0.7, -2);
      chairSeat.castShadow = true;
      chairGroup.add(chairSeat);

      const chairBackGeometry = new THREE.BoxGeometry(1.5, 1.5, 0.15);
      const chairBack = new THREE.Mesh(chairBackGeometry, chairMaterial);
      chairBack.position.set(10, 1.45, -1.2);
      chairBack.castShadow = true;
      chairGroup.add(chairBack);

      roomGroup.add(chairGroup);

      // 电脑
      const monitorGroup = new THREE.Group();
      const screenGeometry = new THREE.BoxGeometry(2, 1.2, 0.08);
      const screenMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        emissive: 0x4488aa,
        emissiveIntensity: 0.4,
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.set(10, 2.35, -5);
      monitorGroup.add(screen);

      const monitorStandGeometry = new THREE.BoxGeometry(0.5, 0.35, 0.4);
      const monitorStandMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
      });
      const monitorStand = new THREE.Mesh(monitorStandGeometry, monitorStandMaterial);
      monitorStand.position.set(10, 1.75, -5);
      monitorGroup.add(monitorStand);

      roomGroup.add(monitorGroup);

      scene.add(roomGroup);

      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
      scene.add(ambientLight);

      // 主吊灯
      const ceilingLight = new THREE.PointLight(0xffffff, 0.8, 30);
      ceilingLight.position.set(0, 10, 0);
      ceilingLight.castShadow = true;
      ceilingLight.shadow.mapSize.width = 1024;
      ceilingLight.shadow.mapSize.height = 1024;
      scene.add(ceilingLight);

      // 台灯光源
      const lampLight1 = new THREE.PointLight(0xffeedd, 0.7, 10);
      lampLight1.position.set(-5, 3, -5);
      scene.add(lampLight1);

      const lampLight2 = new THREE.PointLight(0xffeedd, 0.7, 10);
      lampLight2.position.set(5, 3, -5);
      scene.add(lampLight2);

      // 窗户月光
      const windowLight = new THREE.PointLight(0xaaccff, 0.4, 20);
      windowLight.position.set(0, 5, -9);
      scene.add(windowLight);

      // 电脑屏幕光
      const monitorLight = new THREE.PointLight(0x88bbdd, 0.3, 5);
      monitorLight.position.set(10, 2.3, -4.5);
      scene.add(monitorLight);
    };

    const loadScene = () => {
      switch (sceneLevel) {
        case 'map':
          setupMapScene();
          break;
        case 'home':
          setupHomeScene();
          break;
        case 'bedroom':
          setupBedroomScene();
          break;
      }
    };

    loadScene();

    // 鼠标控制
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationY = 0;
    let rotationX = 0.2;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotationY += deltaX * 0.01;
      rotationX = Math.max(-0.5, Math.min(0.6, rotationX + deltaY * 0.01));

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
      rotationX = Math.max(-0.5, Math.min(0.6, rotationX + deltaY * 0.01));

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

      let radius = 10;
      let yOffset = 0;
      
      switch (sceneLevel) {
        case 'map':
          radius = 80;
          yOffset = 40;
          break;
        case 'home':
          radius = 25;
          yOffset = 8;
          break;
        case 'bedroom':
          radius = 12;
          yOffset = 4;
          break;
      }

      camera.position.x = Math.sin(rotationY) * radius * Math.cos(rotationX);
      camera.position.y = yOffset + Math.sin(rotationX) * radius * 0.5;
      camera.position.z = Math.cos(rotationY) * radius * Math.cos(rotationX);
      
      let lookAtY = 3;
      switch (sceneLevel) {
        case 'map': lookAtY = 10; break;
        case 'home': lookAtY = 4; break;
        case 'bedroom': lookAtY = 2.5; break;
      }
      camera.lookAt(0, lookAtY, 0);

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
  }, [sceneLevel]);

  const getSceneTitle = () => {
    switch (sceneLevel) {
      case 'map': return '城市地图';
      case 'home': return '家';
      case 'bedroom': return '卧室';
      default: return '';
    }
  };

  const getBackAction = () => {
    switch (sceneLevel) {
      case 'map':
        return () => navigate('/main');
      case 'home':
        return () => setSceneLevel('map');
      case 'bedroom':
        return () => setSceneLevel('home');
      default:
        return () => navigate('/main');
    }
  };

  const getForwardAction = () => {
    switch (sceneLevel) {
      case 'map':
        return () => setSceneLevel('home');
      case 'home':
        return () => setSceneLevel('bedroom');
      default:
        return null;
    }
  };

  const getForwardLabel = () => {
    switch (sceneLevel) {
      case 'map':
        return '进入家';
      case 'home':
        return '进入卧室';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full h-screen" style={{ backgroundColor: 'rgb(0, 0, 0)' }}>
      {/* 3D场景容器 */}
      <div ref={containerRef} className="w-full h-full" />

      {/* 顶部导航覆盖层 */}
      <div className="absolute top-0 left-0 right-0 p-6 md:p-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={getBackAction()}
            className="flex items-center gap-2 text-white hover:text-gray-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg tracking-wide">返回</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {getSceneTitle()}
          </h1>
          <div className="w-24" />
        </div>
      </div>

      {/* 底部操作按钮 */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-gray-500 text-sm">拖动旋转视角</p>
            </div>
            {getForwardAction() && (
              <button
                onClick={getForwardAction()}
                className="px-8 py-4 rounded-2xl border text-white font-semibold transition-all duration-300 hover:bg-white/15 hover:shadow-lg"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgb(23, 23, 23)'
                }}
              >
                {getForwardLabel()}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenePage;
