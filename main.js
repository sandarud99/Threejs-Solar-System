//INITIAL SETUP CODE

import * as THREE from "three";

//create a new scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(-3, 8, 30);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//control the system
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const controls = new OrbitControls(camera, renderer.domElement);

//adding lights
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

//STARS
//adding stars for the scene
import StarImg from "./images/stars.jpg";
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  StarImg,
  StarImg,
  StarImg,
  StarImg,
  StarImg,
  StarImg,
]);

//SATURN
//adding saturn
const saturnImage = new THREE.TextureLoader().load("./images/saturn.jpg");
const saturnTexture = new THREE.TextureLoader().load("./images/saturn_Map.jpg");

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: saturnImage,
    normalMap: saturnTexture,
  })
);
scene.add(saturn);

//adding saturn's ring
const ringTexture = new THREE.TextureLoader().load("./images/saturn_ring.png");
const ring = new THREE.Mesh(
  new THREE.RingGeometry(5, 9, 32),
  new THREE.MeshStandardMaterial({
    map: ringTexture,
    side: THREE.DoubleSide,
  })
);
scene.add(ring);

//rotate the ring at starting point
ring.rotation.x = 1.5;
ring.rotation.y = 0.1;

//SUN
//adding sun to the scene
const sunTexture = new THREE.TextureLoader().load("./images/sun-texture.jpg");
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  })
);
scene.add(sun);

//move sun
sun.position.x = -20;
sun.position.y = 2;
sun.position.z = -25;

//add directional light from the sun
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(-20, 2, -20);
scene.add(directionalLight);

//MOON
//add moon to the scene
const moonTexture = new THREE.TextureLoader().load("./images/moon.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);
saturn.add(moon);

//move moon
moon.position.x = 12;
moon.position.y = 0;
moon.position.z = 2;

//MOON 1
//add moon1 to the scene
const moonTexture1 = new THREE.TextureLoader().load("./images/moon2.jpg");
const moon1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture1,
  })
);

//move moon1
moon1.position.x = 9;
moon1.position.y = 0;
moon1.position.z = 10;

//create object for moon1
const moonObj1 = new THREE.Object3D();
moonObj1.add(moon1);
scene.add(moonObj1);

//MOON 2
//add another moon to the scene
const moonTexture2 = new THREE.TextureLoader().load("./images/moon4.jpg");
const moon2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture2,
  })
);

//move moon2
moon2.position.x = 15;
moon2.position.y = 0;
moon2.position.z = 10;

//create object for moon2
const moonObj2 = new THREE.Object3D();
moonObj2.add(moon2);
scene.add(moonObj2);

//SPACESHIP
//load spaceship texture
const spaceshipTexture = new THREE.TextureLoader().load("./images/spship1.png");

//width and height of the spaceship
const spaceshipWidth = 2;
const spaceshipHeight = 2;

//create spaceship object
const spaceshipGeometry = new THREE.PlaneGeometry(
  spaceshipWidth,
  spaceshipHeight
);
const spaceshipMaterial = new THREE.MeshBasicMaterial({
  map: spaceshipTexture,
  side: THREE.DoubleSide,
  transparent: true,
});
const spaceship = new THREE.Mesh(spaceshipGeometry, spaceshipMaterial);
scene.add(spaceship);

//set initial spaceship position
spaceship.position.x = -30; // Adjust starting position
spaceship.position.y = 1; // Adjust vertical position

//spaceship movement variables
let spaceshipDirection = 1; // 1 for moving right
const spaceshipSpeed = 0.009;

function animate() {
  renderer.render(scene, camera);
  //add saturn rotation
  saturn.rotation.y += 0.002;
  //add moon rotation
  moon.rotation.y += 0.002;
  //add moon1 rotation
  moon1.rotation.y += 0.005;

  moonObj1.rotation.y += 0.0009; //add moonObj1 rotation
  moonObj2.rotation.y += 0.0005; //add moonObj2 rotation

  sun.rotation.y += 0.001; //add sun rotation

  // Update spaceship position for movement
  spaceship.position.x += spaceshipDirection * spaceshipSpeed;
  spaceship.position.y += spaceshipDirection * spaceshipSpeed;

  controls.update();
}
renderer.setAnimationLoop(animate);
