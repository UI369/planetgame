// Import the '_3D' object from '_3D.js'
// Importing as _3D with type any
import _3D from "./util/_3D.js";
import * as THREE from "three";
import { EventEmitter } from "./util/event_emitter";

let emit = new EventEmitter();

_3D.SCREEN_WIDTH = window.innerWidth / 2;
_3D.SCREEN_HEIGHT = window.innerHeight / 2;

let base_z = -700;

let planets: THREE.Mesh[] = [];

function createPlanet(name: string, color: string, x: number, y: number) {
  let newPlanet = new THREE.Mesh(
    new THREE.SphereGeometry(20, 16, 16),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(color) })
  );

  newPlanet.position.z = base_z;
  newPlanet.position.x = x;
  newPlanet.position.y = y;
  newPlanet.visible = true;
  _3D.scene.add(newPlanet);

  planets.push(newPlanet);
}

function createRoute(ax: number, ay: number, bx: number, by: number) {
  let curve = new THREE.LineCurve3(
    new THREE.Vector3(ax, ay, base_z),
    new THREE.Vector3(bx, by, base_z)
  );

  // Create a points geometry from the curve
  let geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));

  // Create a material for the line
  let material = new THREE.LineBasicMaterial({
    color: 0xffffff, // white
    transparent: true,
    opacity: 0.7,
  });

  // Create the line mesh
  let line = new THREE.Line(geometry, material);

  // Add the line to the scene
  _3D.scene.add(line);
}

function createRing(radius: number) {
  let geometry = new THREE.RingGeometry(radius, radius + 10, 64);

  let material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    transparent: true,
    opacity: 0.7,
    side: THREE.DoubleSide,
  });

  // Create a mesh using the geometry and material
  let ring = new THREE.Mesh(geometry, material);
  ring.position.z = base_z;
  ring.position.x = 0;
  ring.position.y = 0;

  // Add the ring to the scene
  _3D.scene.add(ring);
}

function moveCamera() {
  console.log("_3D.activeCamera", _3D.activeCamera.position);
  _3D.activeCamera.position.z -= 100;
  _3D.activeCamera.updateProjectionMatrix();
  console.log("_3D.activeCamera", _3D.activeCamera.position);
  console.log("moved camera");
}

function onKeyDown(event: any) {
  switch (event.keyCode) {
    case 65 /*A*/:
      console.log("user pressed A");
      emit.emit("keypress_a");
      break;
    case 83 /*S*/:
      console.log("user pressed S");
      emit.emit("keypress_s");
      break;
    case 68 /*D*/:
      console.log("user pressed D");
      emit.emit("keypress_d");
      break;
    case 70 /*F*/:
      console.log("user pressed F");
      emit.emit("keypress_f");
      break;
  }
}

export function initPlanetGame() {
  // Calling functions of _3D object
  _3D.init();

  createPlanet("planet_0a", "yellow", 0, 0);
  createPlanet("planet_1a", "teal", 100, 100);
  createPlanet("planet_1b", "teal", 0, -100);
  createPlanet("planet_1c", "teal", -100, 0);

  createRoute(0, 0, 100, 100);
  createRoute(0, 0, 0, -100);
  createRoute(0, 0, -100, 0);

  createRing(250);

  window.addEventListener("keydown", onKeyDown);
  emit.subscribe("keypress_a", moveCamera);

  _3D.animate();
}
