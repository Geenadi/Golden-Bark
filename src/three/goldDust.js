import * as THREE from 'three';

/* A small radial-gradient sprite rendered to a canvas, used so each
   dust speck reads as a soft glow rather than a hard square dot. */
function createDustTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255, 246, 220, 1)');
  gradient.addColorStop(0.35, 'rgba(230, 188, 120, 0.75)');
  gradient.addColorStop(1, 'rgba(230, 188, 120, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

let sharedTexture = null;
function getDustTexture() {
  if (!sharedTexture) sharedTexture = createDustTexture();
  return sharedTexture;
}

/* A soft field of warm gold light specks drifting slowly upward with
   gentle sway — pure ambience over the real product photography,
   never a synthetic "object". */
export function createGoldDust({ count = 90, spreadX = 7, spreadY = 5, spreadZ = 4 } = {}) {
  const base = new Float32Array(count * 3);
  const phase = new Float32Array(count);
  const speed = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    base[i * 3] = (Math.random() - 0.5) * spreadX * 2;
    base[i * 3 + 1] = (Math.random() - 0.5) * spreadY * 2;
    base[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;
    phase[i] = Math.random() * Math.PI * 2;
    speed[i] = 0.15 + Math.random() * 0.25;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(base.slice(), 3));

  const material = new THREE.PointsMaterial({
    map: getDustTexture(),
    color: '#F0D9A8',
    size: 0.14,
    transparent: true,
    opacity: 0.65,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  points.userData = { base, phase, speed, spreadY };
  return points;
}

export function updateGoldDust(points, time) {
  const { base, phase, speed, spreadY } = points.userData;
  const position = points.geometry.attributes.position;
  const count = phase.length;
  const wrap = spreadY;

  for (let i = 0; i < count; i++) {
    const ix = i * 3;
    const drift = (time * speed[i] * 0.35 + spreadY) % (wrap * 2);
    let y = base[ix + 1] + drift;
    if (y > wrap) y -= wrap * 2;
    const sway = Math.sin(time * speed[i] + phase[i]) * 0.25;
    position.setXYZ(i, base[ix] + sway, y, base[ix + 2]);
  }
  position.needsUpdate = true;
}

export function disposeGoldDust(points) {
  points.geometry.dispose();
  points.material.dispose();
}
