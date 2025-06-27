import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { DotScreenPass } from 'three/addons/postprocessing/DotScreenPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

let scene, camera, renderer, composer, controls, clock, mixer;
const container = document.getElementById('canvas');

document.addEventListener("DOMContentLoaded", () => {
    window.onload = () => {
        initScene();
        animate();
        loadModelAsync();
    };
});

function initScene() {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(275, 350);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(10, container.clientWidth / container.clientHeight);
    camera.position.set(0, 6, 0);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = 1.4;
    controls.maxPolarAngle = 1.4;
    controls.target = new THREE.Vector3(0, 0.9, 0);
    controls.update();

    scene.add(new THREE.AmbientLight());

    const spotlight1 = new THREE.SpotLight(0xffffff, 20, 8, 1);
    spotlight1.penumbra = 0.5;
    spotlight1.position.set(0, 4, 2);
    spotlight1.castShadow = true;
    scene.add(spotlight1);

    const spotlight2 = new THREE.SpotLight(0xffffff, 20, 8, 1);
    spotlight2.penumbra = 0.5;
    spotlight2.position.set(-4, 1, 2);
    spotlight2.castShadow = true;
    scene.add(spotlight2);

    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new DotScreenPass(new THREE.Vector2(0, 0), 0.5, 0.8));
    composer.addPass(new OutputPass());

    clock = new THREE.Clock();
}

async function loadModelAsync() {
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    const loadContainer = document.querySelector('#canvas .loading');
    const progressText = loadContainer.children[0];
    try {
        const response = await fetch('3d_files/model_compressed.glb');
        const totalBytes = parseInt(response.headers.get('Content-Length') || '0');
        const reader = response.body.getReader();
        let received = 0;
        const chunks = [];

        let lastPercentShown = 0;
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            chunks.push(value);
            received += value.length;

            console.log("Content-Length :", totalBytes);
            console.log("received :", totalBytes);

            if (totalBytes === 0 || isNaN(totalBytes)) {
                // Ne pas afficher de pourcentage
                progressText.textContent = "Chargement";
            } else if (totalBytes > 0) {

                const percent = Math.round((received / totalBytes) * 100);

                if (percent >= lastPercentShown + 10 || percent === 100) {
                    progressText.textContent = `${percent}%`;
                    lastPercentShown = percent;
                    // Laisse au navigateur le temps d'afficher la mise à jour
                    await new Promise(requestAnimationFrame);
                }
            }
        }

        const arrayBuffer = new Uint8Array(received);
        let offset = 0;
        for (const chunk of chunks) {
            arrayBuffer.set(chunk, offset);
            offset += chunk.length;
        }

        // Laisse le thread respirer
        requestAnimationFrame(() => {
            loader.parse(arrayBuffer.buffer, '', gltf => {
                addModelToScene(gltf);
                loadContainer.style.display = 'none';
            }, err => {
                console.error('Erreur lors du parsing du modèle :', err);
                loadContainer.innerHTML = 'Erreur au chargement du modèle.';
            });
        });

    } catch (e) {
        console.error('Erreur lors du chargement du modèle :', e);
        loadContainer.innerHTML = 'Erreur réseau ou accès au fichier.';
    }
}

function addModelToScene(gltf) {
    const model = gltf.scene;
    model.traverse(child => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    model.position.y = -0.6;
    model.rotation.y = 0.55;
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);
    const clip = THREE.AnimationClip.findByName(gltf.animations, 'look_around');
    const action = mixer.clipAction(clip);
    action.play();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    if (mixer) mixer.update(clock.getDelta());
    composer.render();
}
