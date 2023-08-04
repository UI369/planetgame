// _3D.js

import * as THREE from "three"; // assuming THREE is a module
import { Tween, Easing, update } from "@tweenjs/tween.js";

let _3D = {
  container: null,
  renderer: null,
  clock: new THREE.Clock(),
  clockDelta: 0,
  framerate: 1 / 30,
  theta: 0,
  delta: 0.1,
  SCREEN_WIDTH: window.innerWidth,
  SCREEN_HEIGHT: window.innerHeight,
};

_3D.init3DSetup = function () {
  _3D.container = document.createElement("div");
  document.body.appendChild(_3D.container);

  _3D.scene = new THREE.Scene();

  _3D.initCameras();

  // add light
  var light = new THREE.PointLight(0xffffff, 10000);
  light.position.set(50, 50, 50);
  _3D.scene.add(light);

  //
  _3D.createStarScape();

  //
  _3D.renderer = new THREE.WebGLRenderer({ antialias: true });
  _3D.renderer.setPixelRatio(window.devicePixelRatio);
  _3D.renderer.setSize(_3D.SCREEN_WIDTH, _3D.SCREEN_HEIGHT);
  _3D.container.appendChild(_3D.renderer.domElement);
  _3D.renderer.autoClear = false;

  window.addEventListener("resize", _3D.onWindowResize);
  _3D.onWindowResize();
};

_3D.initCameras = function () {
  _3D.mainCamera = new THREE.PerspectiveCamera(45, 1 * _3D.aspect, 1, 1300); //fov, aspect, near, far

  _3D.mainCameraHelper = new THREE.CameraHelper(_3D.mainCamera);
  _3D.mainCameraHelper.visible = false;
  _3D.scene.add(_3D.mainCameraHelper);

  _3D.activeCamera = _3D.mainCamera;
  console.log("_3D.activeCamera", _3D.activeCamera);
  _3D.activeCameraHelper = _3D.mainCameraHelper;

  _3D.backstageCamera = new THREE.PerspectiveCamera(
    1500,
    1 * _3D.aspect,
    0,
    10000
  );
  _3D.backstageCameraHelper = new THREE.CameraHelper(_3D.backstageCamera);

  _3D.mainCamera.rotation.y = -Math.PI; // counteract different front orientation of mainCameras vs rig
  //mainCamera.rotation.x = Math.PI * 2;
  //mainCamera.rotation.z = Math.PI;
  _3D.mainCamera.updateProjectionMatrix();
  _3D.mainCameraRig = new THREE.Group();
  _3D.mainCameraRig.add(_3D.mainCamera);

  _3D.focalPoint = new THREE.Mesh(
    new THREE.BoxGeometry(10, 50, 70, 2, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
  );
  _3D.focalPoint.position.z = -700;
  _3D.focalPoint.visible = true;
  _3D.scene.add(_3D.focalPoint);

  _3D.mainCameraRig.lookAt(_3D.focalPoint.position);
  _3D.mainCameraRig.position.z += 300;
  _3D.mainCameraRig.position.y += 50;

  //_3D.scene.add(_3D.mainCameraRig);
  //_3D.scene.add(_3D.backstageCamera);

  console.log("_3D.mainCamera.position", _3D.mainCamera.position);
  console.log("_3D.backstageCamera.position", _3D.backstageCamera.position);
};

_3D.createStarScape = function () {
  //
  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  for (let i = 0; i < 5000; i++) {
    vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
    vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
    vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  const particles = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ color: 0x888888 })
  );
  _3D.scene.add(particles);
};

_3D.animate = function () {
  requestAnimationFrame(_3D.animate);
  update();
  _3D.clockDelta += _3D.clock.getDelta();

  if (_3D.clockDelta > _3D.framerate) {
    // The draw or time dependent code are here
    _3D.render();

    _3D.clockDelta = _3D.clockDelta % _3D.framerate;
  }
};

_3D.render = function () {
  const r = Date.now() * 0.0005;

  //Wibble wobble camera thing
  //_3D.theta += delta;
  /*activeCamera.position.x = 50 * Math.sin(THREE.MathUtils.degToRad(_3D.theta));
  activeCamera.position.y = 50 * Math.sin(THREE.MathUtils.degToRad(_3D.theta));
  activeCamera.position.z = 50 * Math.sin(THREE.MathUtils.degToRad(_3D.theta));
  activeCamera.lookAt(focalPoint.position);
  if (_3D.theta > 5) {
    delta = -delta;
  }*/

  _3D.theta += _3D.delta;
  //_3D.logoBlock.rotation.z = Math.sin(THREE.MathUtils.degToRad(_3D.theta));
  //_3D.logoBlock.rotation.y = Math.sin(THREE.MathUtils.degToRad(_3D.theta)) / 18;
  //activeCamera.rotation.x = Math.sin(THREE.MathUtils.degToRad(_3D.theta));
  //activeCamera.rotation.z = activeCamera.rotation.z + 0.01;

  //render from current activeCamera
  _3D.renderer.clear();
  _3D.renderer.setViewport(0, 0, _3D.SCREEN_WIDTH, _3D.SCREEN_HEIGHT);
  _3D.renderer.render(_3D.scene, _3D.activeCamera);
};

_3D.onWindowResize = function () {
  var bounding_rect = window.visualViewport;
  //Removing the -20 will fix the offset issue, but adds scrollbars. TODO: Why?
  _3D.SCREEN_WIDTH = bounding_rect.width - 20;
  _3D.SCREEN_HEIGHT = bounding_rect.height - 20;
  //SCREEN_WIDTH = window.innerWidth;
  //SCREEN_HEIGHT = window.innerHeight;
  _3D.aspect = _3D.SCREEN_WIDTH / _3D.SCREEN_HEIGHT;

  _3D.renderer.setSize(_3D.SCREEN_WIDTH, _3D.SCREEN_HEIGHT);

  _3D.activeCamera.aspect = 1 * _3D.aspect;
  _3D.activeCamera.updateProjectionMatrix();
};

_3D.init = function () {
  _3D.init3DSetup();
  //initGameSystem();
  //initGUI();
};

_3D.aspect = _3D.SCREEN_WIDTH / _3D.SCREEN_HEIGHT;

export default _3D;
