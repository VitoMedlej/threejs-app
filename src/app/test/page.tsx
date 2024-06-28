"use client"

import React, {useRef, useEffect} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'stats.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

const useBoxMovement = (window : any, box : THREE.Mesh, boundingBoxes : any,camera : any) => {
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    const boxSpeed = 0.05; // Adjust speed as needed

    const handleKeyDown = (event : any) => {
        switch (event.key) {
            case 'w':
                moveForward = true;
                break;
            case 's':
                moveBackward = true;
                break;
            case 'a':
                moveLeft = true;
                break;
            case 'd':
                moveRight = true;
                break;
        }
    };

    const handleKeyUp = (event : any) => {
        switch (event.key) {
            case 'w':
                moveForward = false;
                break;
            case 's':
                moveBackward = false;
                break;
            case 'a':
                moveLeft = false;
                break;
            case 'd':
                moveRight = false;
                break;
        }
    };

    const checkCollision = (box : THREE.Mesh, boundingBoxes : THREE.Box3[]) => {
        const boxBounding = new THREE
            .Box3()
            .setFromObject(box);
        for (let i = 0; i < boundingBoxes.length; i++) {
            if (boxBounding.intersectsBox(boundingBoxes[i])) {
                return true;
            }
        }
        return false;
    };
    const animate = () => {
        // let direction = new THREE.Vector3();
        // box.getWorldDirection(direction);
        let forward = new THREE.Vector3();
        camera.getWorldDirection(forward);


        const originalPosition = box
            .position
            .clone();

        // if (moveForward) box.position.z -= boxSpeed;
        // if (moveForward) {

        //     direction.multiplyScalar(boxSpeed);
        //     box
        //         .position
        //         .sub(direction);
        // }
        box.position.y = 1;
        // box.rotation.y = camera.rotation.y;
        // box.rotation.y = camera.rotation.y;

        if (moveForward) box.position.add(forward.clone().multiplyScalar(boxSpeed));
        if (moveBackward) box.position.add(forward.clone().multiplyScalar(-boxSpeed));
        // if (moveBackward) 
        //     box.position.z += boxSpeed;
        if (moveLeft) 
            box.position.x -= boxSpeed;
        if (moveRight) 
            box.position.x += boxSpeed;
        
        if (checkCollision(box, boundingBoxes)) {
            box
                .position
                .copy(originalPosition);
        }
        // box.rotation.copy(camera.rotation); 
        // box.rotation.y = camera.rotation.y;
        // camera.position.copy(box.position);
        requestAnimationFrame(animate);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);


    animate();

    // Cleanup function to remove event listeners on component unmount
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    };
};

function onMouseMove(event : any, box : any, mouse : any) {
    // Normalize mouse position from -1 to 1
    // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // // if (mouse.y > 1 || mouse.y < 0.5) {   return; } Rotate the box according to
    // // mouse position box.rotation.x = - mouse.y;
    // box.rotation.y = -mouse.x;
}


const ThreeScene : React.FC = () => {
    const containerRef = useRef < HTMLDivElement > (null);

    useEffect(() => {

      window.addEventListener('keydown', function (event) {
        if (event.key === 'f') {
            if (!document.fullscreenElement) {
                renderer.domElement.requestFullscreen().catch(console.log);
            } else {
                document.exitFullscreen();
            }
        }
    });



        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 6000);
        const stats = new Stats();

        const panel = new Stats.Panel("FPS", "#ff0000", "#0000ff");
        stats.addPanel(panel);
        stats.showPanel(0);

        const renderer = new THREE.WebGLRenderer({antialias: true});

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('/materials/moon.jpeg');
        const texture2 = textureLoader.load('/materials/wall.jpg');
        const texture3 = textureLoader.load('/materials/money.jpeg');
        const skyTexture = textureLoader.load('/materials/skye.jpg');
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        const gridHelper = new THREE.GridHelper(10, 10);
        // const pointLight = new THREE.PointLight('white', 20); // soft white light
        const AmbientLight = new THREE.AmbientLight('white', .1); // soft white light

        // scene.background = textureLoader.load('/materials/skye.jpg');

        AmbientLight
            .position
            .set(0, 8, 0);
        scene.add(AmbientLight, gridHelper);

        renderer.setSize(window.innerWidth, window.innerHeight);
        if (containerRef
            ?.current
                ?.firstChild) {
            containerRef
                .current
                .removeChild(containerRef.current.firstChild);
        }
        containerRef
            ?.current
                ?.appendChild(renderer.domElement);
        containerRef
            ?.current
                ?.appendChild(stats.dom);

        const geometry = new THREE.PlaneGeometry(20, 20);
        const box = new THREE.BoxGeometry(1.2, 1, 1);
        const wallGeometry = new THREE.BoxGeometry(20, 8.2, 1.2);
        let mouse = new THREE.Vector2();
        const material = new THREE.MeshStandardMaterial({wireframe: false, map: texture});
        const material2 = new THREE.MeshStandardMaterial({map: texture3});
        const material3 = new THREE.MeshStandardMaterial({map: texture2});
        const material4 = new THREE.MeshStandardMaterial({color: 'transparent'});

        // Load the texture
        const loader = new THREE.TextureLoader();
        const tt = loader.load('/materials/skye.jpg');

        // Create an array of materials for the skybox
        const materials = [
            new THREE.MeshBasicMaterial({map: tt, side: THREE.BackSide}),
            new THREE.MeshBasicMaterial({map: tt, side: THREE.BackSide}),
            new THREE.MeshBasicMaterial({map: tt, side: THREE.BackSide}),
            new THREE.MeshBasicMaterial({map: tt, side: THREE.BackSide}),
            new THREE.MeshBasicMaterial({map: tt, side: THREE.BackSide}),
            new THREE.MeshBasicMaterial({map: tt, side: THREE.BackSide})
        ];

        // Create the skybox geometry
        const skyBoxGeometry = new THREE.BoxGeometry(5000, 5000, 5000);

        // Create the skybox mesh
        const skyBox = new THREE.Mesh(skyBoxGeometry, materials);

        // Add the skybox to the scene
        scene.add(skyBox);

        const land = new THREE.Mesh(geometry, material);
        const boxUser = new THREE.Mesh(box, material2);

        const obstacles = [];
        const boundingBoxes : any = [];

        const wall1 = new THREE.Mesh(wallGeometry, material3);
        const wall2 = new THREE.Mesh(wallGeometry, material3);
        const wall3 = new THREE.Mesh(wallGeometry, material3);
        const wall4 = new THREE.Mesh(wallGeometry, material3);

        wall1
            .position
            .set(0, 0.6, 10); // Top wall
        wall2
            .position
            .set(0, 0.6, -10); // Bottom wall
        wall3
            .position
            .set(-10, 0.6, 0); // Left wall
        wall3.rotation.y = Math.PI / 2; // Rotate to be vertical
        wall4
            .position
            .set(10, 0.6, 0); // Right wall
        wall4.rotation.y = Math.PI / 2; // Rotate to be vertical

        scene.add(wall1, wall2, wall3, wall4);
        obstacles.push(wall1, wall2, wall3, wall4);

        obstacles.forEach((obstacle) => {
            const boundingBox = new THREE
                .Box3()
                .setFromObject(obstacle);
            boundingBoxes.push(boundingBox);
        });


        // const Orbitcontrols = new OrbitControls(camera, renderer.domElement);





        // camera
        //     .position
        //     .copy(boxUser.position);
        // camera.position.z = 0;
        camera.position.y = 1;
        
        land.rotation.x = -Math.PI / 2;


        const geo = new THREE.BoxGeometry(1, 1, 1);
const mat = new THREE.MeshBasicMaterial({color: 0x00ff00});
const testbox = new THREE.Mesh(geo, mat);
scene.add(testbox);


// testbox.add(camera)
testbox.position.y = 0.6;


        const controls = new PointerLockControls(camera, renderer.domElement);
        containerRef.current?.addEventListener('click', () => {
          if (document.body.contains(containerRef.current)) {
            controls && controls.lock();
          }
        });


        const light = new THREE.DirectionalLight(0xffffff, 1);
        const lightHelper = new THREE.DirectionalLightHelper(light);

        // Set the light's position
        light
            .position
            .set(5, 10, 2);
        light.position.x = 2;
        light.position.z = 5;
        scene.add(land, boxUser, lightHelper);

        // Enable shadows for the light
        light.castShadow = true;
        land.receiveShadow = true;
        wall1.receiveShadow = true;
        wall2.receiveShadow = true;
        wall3.receiveShadow = true;
        wall4.receiveShadow = true;
        // (Optional) Adjust the shadow map size for better shadow quality
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
      

        // Add the light to the scene
        scene.add(light);

        boxUser.castShadow = true;
        boxUser.receiveShadow = true;

//  containerRef.current?.addEventListener('click', () => {
//   if (document.body.contains(containerRef.current)) {
//     controls && controls.lock();
//   }
// });
     


        const cleanup = useBoxMovement(window, testbox, boundingBoxes,camera);

        const animate = function () {
            requestAnimationFrame(animate);
            stats.begin();
            window.addEventListener('mousemove', (event) => onMouseMove(event, testbox, mouse), false);
          //   const handleMouseMove = (event: MouseEvent) => {
          //     onMouseMove(event, boxUser); // Replace boxUser with your actual box mesh
          // };
      
          // window.addEventListener('mousemove', handleMouseMove);
          // Orbitcontrols.update();
          testbox.rotation.y = controls.getObject().rotation.y;
          camera.position.y = 2;
          camera.position.z = 2;
          
          // boxUser.rotation.y = camera.rotation.y  * 4;

            // boxUser.rotation.x += 0.1;
            // boxUser.rotation.y += 0.1;
            renderer.render(scene, camera);
            // window.removeEventListener('mousemove', handleMouseMove);
            stats.end();
        };

        animate();

        return () => {
            cleanup();
            // Orbitcontrols.dispose();
            controls.dispose();
        };
    }, []);

    return <div ref={containerRef}/>;
};

export default ThreeScene;