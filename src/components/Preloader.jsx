import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createGoldDust, updateGoldDust, disposeGoldDust } from '../three/goldDust';
import { createRenderer } from '../three/setupScene';
import './Preloader.css';

const SESSION_KEY = 'gb-intro-shown';

/* Brand moment shown once per browser session when the site first
   opens: soft gold dust drifting across the full screen behind the
   wordmark, then fading away into the homepage. */
export default function Preloader() {
  const mountRef = useRef(null);
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem(SESSION_KEY);
    } catch {
      return true;
    }
  });
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return undefined;
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* private mode etc. */ }

    const mount = mountRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    let frameId;
    let disposed = false;
    let dust;
    let ro;

    if (mount && !reduceMotion) {
      try {
        renderer = createRenderer();
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
        camera.position.set(0, 0, 8);

        dust = createGoldDust({ count: 130, spreadX: 9, spreadY: 6, spreadZ: 5 });
        scene.add(dust);

        const resize = () => {
          const w = mount.clientWidth;
          const h = mount.clientHeight;
          if (!w || !h) return;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        resize();
        ro = new ResizeObserver(resize);
        ro.observe(mount);

        const clock = new THREE.Clock();
        const animate = () => {
          if (disposed) return;
          updateGoldDust(dust, clock.getElapsedTime());
          renderer.render(scene, camera);
          frameId = requestAnimationFrame(animate);
        };
        animate();
      } catch {
        /* WebGL unavailable — the wordmark below still shows. */
      }
    }

    const minTime = setTimeout(() => setFading(true), 1800);

    return () => {
      disposed = true;
      clearTimeout(minTime);
      if (frameId) cancelAnimationFrame(frameId);
      if (ro) ro.disconnect();
      if (renderer) {
        if (dust) disposeGoldDust(dust);
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      }
    };
  }, [visible]);

  useEffect(() => {
    if (!fading) return undefined;
    const t = setTimeout(() => setVisible(false), 700);
    return () => clearTimeout(t);
  }, [fading]);

  if (!visible) return null;

  return (
    <div className={`preloader ${fading ? 'preloader--fade' : ''}`}>
      <div className="preloader-dust" ref={mountRef} aria-hidden="true" />
      <div className="preloader-inner">
        <div className="preloader-brand">
          <span className="preloader-brand-name">Golden Bark</span>
          <span className="preloader-brand-sub">Ceylon Cinnamon Exports</span>
        </div>
        <div className="preloader-bar">
          <div className="preloader-bar-fill" />
        </div>
      </div>
    </div>
  );
}
