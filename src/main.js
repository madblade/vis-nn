/**
 * (c) madblade 2021
 */

import {
    ACESFilmicToneMapping,
    AmbientLight, BoxBufferGeometry, Mesh, MeshPhongMaterial,
    PCFSoftShadowMap,
    PerspectiveCamera, PointLight,
    Scene, sRGBEncoding,
    Vector3,
    WebGLRenderer
} from 'three';
// import {OrbitControls}     from 'three/examples/jsm/controls/OrbitControls';

import { EffectComposer }  from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import {OrbitControls} from "./OrbitControlsZoomFixed";

// screen size
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

// shadow map
const SHADOW_MAP_WIDTH = 1024;
const SHADOW_MAP_HEIGHT = 512;

// camera
let VIEW_ANGLE = 90;
let ASPECT = WIDTH / HEIGHT;
let NEAR = 0.1;
let FAR = 5000;

let camera;
let scene;
let renderer;
let controls;
let lightPosition;

// light & animation
let light;
let ambient;
let lights = [];

// composers
let composer;
let scenePass;

function initRenderer()
{
    renderer = new WebGLRenderer({
        antialias: true,
        logarithmicDepthBuffer: true
    });
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    renderer.outputEncoding = sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    let resizeCallback =  () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', resizeCallback, false);
    window.addEventListener('orientationchange', resizeCallback, false);
}

function initComposer()
{
    composer = new EffectComposer(renderer);
    scenePass = new RenderPass(scene, camera);
    composer.addPass(scenePass);
}

function initScene()
{
    scene = new Scene();
    camera = new PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(0, 0, 3);
    scene.add(camera);

    lightPosition = new Vector3(1, 10, 10);
    light = new PointLight(0xffffff, 0.5);
    light.position.copy(lightPosition);
    light.castShadow = true;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 100;
    light.shadow.bias = 0.0001;
    light.shadow.radius = 10;
    light.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    light.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
    lights.push(light);
    scene.add(light);

    // Ambient for the shadowed region
    ambient = new AmbientLight(0x404040);
    scene.add(ambient);

    // user input
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
}

function init()
{
    initRenderer();
    initScene();
    initComposer();

    let walls = [
        new Mesh(
            new BoxBufferGeometry(),
            new MeshPhongMaterial({ color: '#ff0000'})
        )
    ];
    walls.forEach(w => scene.add(w));
}

let time = 0;
let lastTime = window.performance.now();
function animate()
{
    requestAnimationFrame(animate);

    let now = window.performance.now();
    let delta = now - lastTime;
    lastTime = now;
    time += delta * 0.001;

    // Update camera rotation and position
    controls.update();

    // Perform.
    composer.render();
}

init();
animate();
