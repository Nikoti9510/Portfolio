/* imports */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

document.addEventListener("DOMContentLoaded", () => {
    // chargement du modèle une fois la page chargé
    window.onload = () => loadModel();

    // Gestion du chargement du modèle et des erreurs
    function loadModel() {
        const loader = new GLTFLoader();
        loader.load('3d_files/model_animated.glb',
            (gltf) => {
                // loaded
                setupScene(gltf);
            },
            (xhr) => {
                // progress
                const loadPercent = Math.round((xhr.loaded / xhr.total) * 100);
                console.log(`Chargement... ${loadPercent}%`);
            },
            (error) => {
                // error
                console.log(error);
            }
        );
    }

    // Fonction pour la création de la scène 3D 
    function setupScene(gltf) {
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        const container = document.getElementById('canvas');
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        container.appendChild(renderer.domElement);

        // camera 
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight);
        camera.position.set(6, 6, 0);

        // controls 
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.minDistance = 3;
        controls.minPolarAngle = 1.4;
        controls.maxPolarAngle = 1.4;
        controls.target = new THREE.Vector3(0, .9, 0);
        controls.update();

        // scene 
        const scene = new THREE.Scene();

        // light
        scene.add(new THREE.AmbientLight());
        const spotlight = new THREE.SpotLight(0xffffff, 20, 8, 1);
        spotlight.penumbra = 0.5;
        spotlight.position.set(0, 4, 2);
        spotlight.castShadow = true;
        scene.add(spotlight);

        // ajoute du model 
        const model = gltf.scene;
        model.traverse((child) => {
            if (child.isMesh) {
                // child.castShadow = true;
                // child.receiveShadow = true;
            }
        });

        // ajout du model dans la scene
        scene.add(model);

        // chargement des animations
        const mixer = new THREE.AnimationMixer(model);
        const clips = gltf.animations;
        const idleClip = THREE.AnimationClip.findByName(clips, 'idle');
        const look_aroundClip = THREE.AnimationClip.findByName(clips, 'look_around');
        const idleAction = mixer.clipAction(idleClip);
        const look_aroundAction = mixer.clipAction(look_aroundClip);

        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            mixer.update(clock.getDelta());
            renderer.render(scene, camera);
        }

        animate();
        look_aroundAction.play();
    }
}); 