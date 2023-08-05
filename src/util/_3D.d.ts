// _3D.d.ts
import * as THREE from "three";

declare const _3D: {
  container: HTMLDivElement | null;
  renderer: THREE.WebGLRenderer | null;
  clock: THREE.Clock;
  clockDelta: number;
  framerate: number;
  theta: number;
  delta: number;
  SCREEN_WIDTH: number;
  SCREEN_HEIGHT: number;
  init3DSetup: () => void;
  initCameras: () => void;
  createStarScape: () => void;
  animate: () => void;
  render: () => void;
  onWindowResize: () => void;
  init: () => void;
  aspect: number;
};

export = _3D;
