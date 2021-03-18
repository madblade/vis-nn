
import {
    ACESFilmicToneMapping, AmbientLight,
    BoxBufferGeometry,
    Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    sRGBEncoding,
    Vector3,
    WebGLRenderer
}                         from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass }     from 'three/examples/jsm/postprocessing/RenderPass';
import { OrbitControls }  from './OrbitControlsZoomFixed';

// screen size
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

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

// composers
let composer;
let scenePass;

// resize performance
let resizeTimer = null;

function initRenderer()
{
    renderer = new WebGLRenderer({
        antialias: true,
        logarithmicDepthBuffer: true,
    });
    renderer.userData = {
        elementID: 'myTabContent',
        width: WIDTH,
        height: HEIGHT
    };
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    renderer.outputEncoding = sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);

    let resizeCallback =  () => {
        const ud = renderer.userData;
        const e = ud.elementID;
        let w = window.innerWidth;
        let h = window.innerHeight;
        if (e)
        {
            const elt = document.getElementById(e);
            if (elt)
            {
                const r = elt.getBoundingClientRect();
                w = Math.floor(r.width);
                h = Math.floor(r.height);
            }
        }
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    };

    let resizeHook = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeCallback, 200);
    };

    window.addEventListener('resize', resizeHook, false);
    window.addEventListener('orientationchange', resizeHook, false);

    return renderer;
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
    scene.add(light);

    // Ambient for the shadowed region
    ambient = new AmbientLight(0x404040);
    scene.add(ambient);

    // user input
    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.target.set(0, 0, 0);

    // objects
    let walls = [
        new Mesh(
            new BoxBufferGeometry(),
            new MeshPhongMaterial({ color: '#ff0000'})
        )
    ];
    walls.forEach(w => scene.add(w));

    return camera;
}

// let time = 0;
// let lastTime = window.performance.now();
function animate()
{
    requestAnimationFrame(animate);

    // let now = window.performance.now();
    // let delta = now - lastTime;
    // lastTime = now;
    // time += delta * 0.001;

    // Update camera rotation and position
    controls.update();

    // Perform.
    composer.render();
}

export { animate, initScene, initRenderer, initComposer };
