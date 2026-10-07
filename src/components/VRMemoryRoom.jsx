import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function VRMemoryRoom({ onClose, phases }) {
  const containerRef = useRef(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Flatten all photos with their phase details
  const allPhotos = phases.flatMap((phase) =>
    phase.photos.map((p) => ({
      ...p,
      phaseTitle: phase.title,
      phaseEra: phase.era,
    }))
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0f172a, 0.02);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0.1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const centerPointLight = new THREE.PointLight(0xf59e0b, 2.5, 60);
    centerPointLight.position.set(0, 0, 0);
    scene.add(centerPointLight);

    // Starry Confetti Sky Sphere
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1000;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = 35 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starPos[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPos[i + 2] = radius * Math.cos(phi);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 0.3,
      transparent: true,
      opacity: 0.8,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Floating Birthday Frames in 360 circle
    const frameMeshes = [];
    const radius = 9;
    const count = allPhotos.length;
    const textureLoader = new THREE.TextureLoader();

    allPhotos.forEach((photo, idx) => {
      const angle = (idx / count) * Math.PI * 2;
      const yOffset = Math.sin(idx * 0.9) * 1.8;

      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      // Outer White Polaroid Frame
      const frameGeo = new THREE.BoxGeometry(2.4, 3.0, 0.08);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3,
      });
      const frameMesh = new THREE.Mesh(frameGeo, frameMat);
      frameMesh.position.set(x, yOffset, z);
      frameMesh.lookAt(0, yOffset, 0);

      // Picture inside Frame
      const picGeo = new THREE.PlaneGeometry(2.1, 2.4);
      const picMat = new THREE.MeshBasicMaterial({
        color: 0x333333,
        side: THREE.FrontSide,
      });

      textureLoader.load(
        photo.src,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          picMat.map = tex;
          picMat.color.setHex(0xffffff);
          picMat.needsUpdate = true;
        },
        undefined,
        () => {}
      );

      const picMesh = new THREE.Mesh(picGeo, picMat);
      picMesh.position.set(0, 0.2, 0.05);
      frameMesh.add(picMesh);

      frameMesh.userData = { photoIndex: idx, photo };
      scene.add(frameMesh);
      frameMeshes.push(frameMesh);
    });

    // Mouse / Touch Drag Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let lon = 0;
    let lat = 0;
    let targetLon = 0;
    let targetLat = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      previousMousePosition = {
        x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
        y: e.clientY || (e.touches && e.touches[0].clientY) || 0,
      };
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      const deltaX = currentX - previousMousePosition.x;
      const deltaY = currentY - previousMousePosition.y;

      targetLon -= deltaX * 0.18;
      targetLat += deltaY * 0.18;
      targetLat = Math.max(-85, Math.min(85, targetLat));

      previousMousePosition = { x: currentX, y: currentY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    // Raycaster for clicking photos
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || 0;
      const clientY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY) || 0;

      mouse.x = ((clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(frameMeshes, true);

      if (intersects.length > 0) {
        let hit = intersects[0].object;
        while (hit && !hit.userData?.photo && hit.parent) {
          hit = hit.parent;
        }
        if (hit?.userData?.photo) {
          setSelectedPhoto(hit.userData.photo);
        }
      }
    };

    const dom = containerRef.current;
    dom.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    dom.addEventListener('click', onClick);

    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      lon += (targetLon - lon) * 0.1;
      lat += (targetLat - lat) * 0.1;

      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lon);

      const target = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
      );

      camera.lookAt(target);
      stars.rotation.y += delta * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('click', onClick);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      if (dom.contains(renderer.domElement)) {
        dom.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [allPhotos]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a] flex flex-col select-none overflow-hidden">
      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <span className="text-xs tracking-widest uppercase text-amber-400 font-bold block">
            🎂 360° Birthday Memory Room
          </span>
          <h2 className="text-base sm:text-xl font-bold text-white drop-shadow">
            Drag to Look Around • Tap Any Polaroid to View
          </h2>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition font-bold text-sm tracking-wide shadow-lg cursor-pointer"
        >
          ✕ Close VR
        </button>
      </div>

      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Selected Photo Modal inside VR */}
      {selectedPhoto && (
        <div
          className="absolute inset-0 z-30 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="max-w-md w-full bg-white rounded-2xl p-4 shadow-2xl text-center animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-xl bg-gray-100 max-h-[60vh] flex items-center justify-center">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                className="max-h-[55vh] w-auto object-contain rounded-lg"
              />
            </div>
            <div className="mt-4">
              <span className="text-xs uppercase tracking-wider text-rose-500 font-bold">
                {selectedPhoto.phaseEra}
              </span>
              <h3 className="text-lg font-handwriting font-bold text-gray-900 mt-1">
                {selectedPhoto.caption}
              </h3>
            </div>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="mt-4 px-6 py-2 bg-gray-900 text-white font-bold rounded-full text-sm hover:bg-gray-800 transition cursor-pointer"
            >
              Back to VR Room
            </button>
          </div>
        </div>
      )}

      {/* Bottom Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
        <p className="text-xs sm:text-sm text-white/90 bg-black/60 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
          📱 On Phone: Drag screen to look around • 💻 On Laptop: Drag mouse
        </p>
      </div>
    </div>
  );
}
