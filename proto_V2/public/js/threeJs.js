/* imports */
import * as THREE from 'three';

import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let camera, scene, renderer;

/* appel des fonctions */
init();
render();

/* init */
function init() {
    /* renderer */
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    document.body.appendChild( renderer.domElement );

    /* camera */
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.set( 0, 200, 200 );

    /* environement */
    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    /* scene */
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xbbbbbb );
    scene.environment = pmremGenerator.fromScene( environment ).texture;
    environment.dispose();

    /* grid */
    const grid = new THREE.GridHelper( 500, 10, 0xffffff, 0xffffff );
    grid.material.opacity = 0.5;
    grid.material.depthWrite = false;
    grid.material.transparent = true;
    scene.add( grid );

    /* load model */
    const loader = new GLTFLoader().setPath( '/' );
    loader.load( '3d_files/avatar_1.glb', function ( gltf ) {
        gltf.scene.position.y = 0;
        gltf.scene.scale.set(100,100,100)
        scene.add( gltf.scene );
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
}