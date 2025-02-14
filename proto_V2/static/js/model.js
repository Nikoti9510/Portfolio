/* imports */
import * as THREE from 'three';

import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
// import Stats from 'three/addons/libs/stats.module.js';

// /* stats */
// const stats = new Stats()
// document.body.appendChild(stats.dom)

/* vars */
let camera, scene, renderer;

/* appel des fonctions */
init();
render();

/* init */
function init() {
    /* renderer */
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    document.getElementById("canvas").appendChild( renderer.domElement );

    /* camera */
    camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.set( 0, 200, 200 );

    /* environement */
    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    /* scene */
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    scene.environment = pmremGenerator.fromScene( environment ).texture;
    environment.dispose();

    /* load model */
    const modelLoader = new GLTFLoader().setPath('/3d_files/');
    modelLoader.load( 'avatar_1.glb', function (model) {
        model.scene.position.y = 0;
        model.scene.scale.set(100,100,100);
        scene.add(model.scene);        
        render();
    } );

    /* controls */
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render ); // use if there is no animation loop
    controls.minDistance = 10;
    controls.maxDistance = 1000;
    controls.target.set( 10, 90, - 16 );
    controls.update();
    window.addEventListener( 'resize', onWindowResize );
}



/* window resize */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}



/* render */
function render() {
    renderer.render( scene, camera );
    // stats.update()
}