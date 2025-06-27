/* imports */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { DotScreenPass } from 'three/addons/postprocessing/DotScreenPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

document.addEventListener("DOMContentLoaded", () => {
    // chargement du modèle une fois la page chargé
    window.onload = () => loadModel();

    // Gestion du chargement du modèle et des erreurs
    function loadModel() {
        const loader = new GLTFLoader();
        const loadContainer = document.querySelector('#canvas .loading');
        loader.load('3d_files/model_compressed.glb',
            (gltf) => {
                // loaded
                setupScene(gltf);
                loadContainer.style.display = 'none';
            },
            (xhr) => {
                // progress
                const loadPercent = Math.round((xhr.loaded / xhr.total) * 100);
                loadContainer.children[0].innerHTML = (`${loadPercent}%`);    
                // console.log(`Chargement... ${loadPercent}%`);
            },
            (error) => {
                // error
                // console.log(error);
                loadContainer.innerHTML = (`${error}%`);  
            }
        );
    }

    // Fonction pour la création de la scène 3D 
    function setupScene(gltf) {
        const renderer = new THREE.WebGL1Renderer({
            antialias: true,
            alpha: true
        });
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        const container = document.getElementById('canvas');
        // renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setSize(275, 350);
        renderer.setPixelRatio(window.devicePixelRatio);

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        container.appendChild(renderer.domElement);

        // camera 
        const camera = new THREE.PerspectiveCamera(10, container.clientWidth / container.clientHeight);
        camera.position.set(0, 7, 0);

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
        const spotlight_1 = new THREE.SpotLight(0xffffff, 20, 8, 1);
        spotlight_1.penumbra = 0.5;
        spotlight_1.position.set(0, 4, 2);
        spotlight_1.castShadow = true;
        scene.add(spotlight_1);

        const spotlight_2 = new THREE.SpotLight(0xffffff, 20, 8, 1);
        spotlight_2.penumbra = 0.5;
        spotlight_2.position.set(-4, 1, 2);
        spotlight_2.castShadow = true;
        scene.add(spotlight_2);

        // ajout du model 
        const model = gltf.scene;
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // position du model
        model.position.y = -.6;
        model.rotation.y = .55;

        // ajout du model dans la scene
        scene.add(model);

        // chargement des animations
        const mixer = new THREE.AnimationMixer(model);
        const clips = gltf.animations;
        // const idleClip = THREE.AnimationClip.findByName(clips, 'idle');
        const look_aroundClip = THREE.AnimationClip.findByName(clips, 'look_around');
        // const idleAction = mixer.clipAction(idleClip);
        const look_aroundAction = mixer.clipAction(look_aroundClip);

        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            mixer.update(clock.getDelta());
            renderer.render(scene, camera);
            composer.render();
        }

        // Pass de Post process
        const composer = new EffectComposer( renderer );
        //*--- Ajout initial de la scene dans le composer
        const renderPass = new RenderPass( scene, camera );
        composer.addPass( renderPass );
        //*--- DotScreen
        const DotScreen = new DotScreenPass( new THREE.Vector2( 0, 0 ), 0.5, 0.8 );
        composer.addPass( DotScreen );
        //*--- Ajout du outputpass dans le composer pour finaliser la phase de postprocess et générer la scene finale
        const outputPass = new OutputPass();
        composer.addPass( outputPass );

        // init
        animate();  
        look_aroundAction.play();
    }
}); 