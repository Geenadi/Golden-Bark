import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createGoldDust, updateGoldDust, disposeGoldDust } from '../three/goldDust';
import { createRenderer } from '../three/setupScene';
import './HeroScene3D.css';

/* A soft field of drifting gold light behind the hero copy and photo
   — pure ambience, no synthetic 3D "object", so it never competes
   with the real product photography. Drifts on its own, and eases
   into a slow parallax as the visitor scrolls. */
export default function HeroScene3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    try {
      renderer = createRenderer();
    } catch {
      return undefined;
    }
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.set(0, 0, 8);

    const dust = createGoldDust({ count: 100, spreadX: 8, spreadY: 5.5, spreadZ: 4 });
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
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(mount);

    let targetScroll = window.scrollY;
    let currentScroll = targetScroll;
    const onScroll = () => { targetScroll = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!visible) return;

      const dt = Math.min(clock.getDelta(), 0.1);
      currentScroll += (targetScroll - currentScroll) * Math.min(1, dt * 4);

      if (!reduceMotion) updateGoldDust(dust, clock.getElapsedTime());
      dust.position.y = -currentScroll * 0.0018;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      ro.disconnect();
      io.disconnect();
      disposeGoldDust(dust);
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="hero-3d" ref={mountRef} aria-hidden="true" />;
}
