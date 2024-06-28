"use client"
import React, {useRef, useEffect} from 'react';
import * as THREE from 'three';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js';
import MobileButtons from '../MobileButtons/MobileButtons';

const ThreeScene : React.FC = () => {
    const canvasRef = useRef < HTMLCanvasElement > (null);
    useEffect(() => {
        let scene : THREE.Scene,
            camera : THREE.PerspectiveCamera,
            renderer : THREE.WebGLRenderer,
            controls : PointerLockControls;


        const velocity = new THREE.Vector3();
        const onKeyDown = (event : KeyboardEvent | any) => {

            switch (event.key) {
                    // case 'w':   controls.moveForward(1);   break; case 'a':
                    // controls.moveRight(-1);   break; case 's':   controls.moveForward(-1);
                    // break; case 'd':   controls.moveRight(1);   break;
                case 'w':
                    velocity.z = -0.7;
                    break;
                case 'a':
                    velocity.x = -0.7;
                    break;
                case 's':
                    velocity.z = 0.9;
                    break;
                case 'd':
                    velocity.x = 0.9;
                    break;
            }
        };
        const onKeyUp = (event : KeyboardEvent | any) => {
            switch (event.key) {
                case 'w':
                case 's':
                    velocity.z = 0;
                    break;
                case 'a':
                case 'd':
                    velocity.x = 0;
                    break;
            }
        };


       


        const init = () => {


            const buttons : any = document.querySelectorAll('.mobile-button')
            console.log('buttons: ', buttons);


            buttons.forEach((button : any) => {
              button.addEventListener('touchstart', (e:any)=>{onKeyDown({key:`${e.target?.id}`})})
              button.addEventListener('touchend', (e:any)=>{onKeyUp({key:`${e.target?.id}`})})
            })
    




            // Scene
            scene = new THREE.Scene();

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
            directionalLight
                .position
                .set(10, 20, 10);
            scene.add(directionalLight);

            // Camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
            camera
                .position
                .set(0, 10, 20); // Adjust position for better view

            const loader = new THREE.TextureLoader();
            // Renderer
            renderer = new THREE.WebGLRenderer({
                canvas: canvasRef.current !
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            const texture2 = loader.load('/materials/wall.jpg');

            const texture3 = loader.load('/materials/moon.jpeg');
            const material3 = new THREE.MeshStandardMaterial({map: texture2});
            const texture5 = loader.load('/materials/money.jpeg');
            const material2 = new THREE.MeshStandardMaterial({map: texture5});
        const box = new THREE.BoxGeometry(8, 8, 8);

            const boxUser = new THREE.Mesh(box, material2);
            boxUser.position.x= 35;
            boxUser.position.z= 35;
            boxUser.position.y= 5;
            scene.add(boxUser)







            


            // Terrain (just a flat plane for simplicity)
            const terrainGeometry = new THREE.PlaneGeometry(200, 200, 50, 50);
            const terrainMaterial = new THREE.MeshStandardMaterial({map: texture3});
            const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
            terrain.rotation.x = -Math.PI / 2; // Rotate to lay flat
            scene.add(terrain);

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
            const wallGeometry = new THREE.BoxGeometry(200, 40, 1.2);

            // Add the skybox to the scene
            scene.add(skyBox);

            const obstacles = [];
            const boundingBoxes : any = [];

            const wall1 = new THREE.Mesh(wallGeometry, material3);
            const wall2 = new THREE.Mesh(wallGeometry, material3);
            const wall3 = new THREE.Mesh(wallGeometry, material3);
            const wall4 = new THREE.Mesh(wallGeometry, material3);

            wall1
                .position
                .set(0, 20, 100); // Top wall
            wall2
                .position
                .set(0, 20, -100); // Bottom wall
            wall3
                .position
                .set(-100, 20, 0); // Left wall
            wall4
                .position
                .set(100, 20, 0); // Right wall

            wall3.rotation.y = Math.PI / 2; // Rotate to be vertical
            wall4.rotation.y = Math.PI / 2; // Rotate to be vertical

            scene.add(wall1, wall2, wall3, wall4);
            obstacles.push(wall1, wall2, wall3, wall4);

            obstacles.forEach((obstacle) => {
                const boundingBox = new THREE
                    .Box3()
                    .setFromObject(obstacle);

                // const helper = new THREE.Box3Helper(boundingBox, 0xffff00); // yellow color
                // scene.add(helper);

                boundingBoxes.push(boundingBox);
            });

        
          
          const checkCollision = (cameraBoundingBox: any,boundingBoxes : any) => {
              for (let i = 0; i < boundingBoxes.length; i++) {
                  if (cameraBoundingBox.intersectsBox(boundingBoxes[i])) {
                      return true;
                  }
              }
              return false;
          };

            // Pointer Lock Controls
            controls = new PointerLockControls(camera, renderer.domElement);
            canvasRef.current !.addEventListener('click', () => {
                controls.lock();
            });


            
            scene.add(controls.getObject());




            // Event listeners
            document.addEventListener('keydown', onKeyDown);
            document.addEventListener('keyup', onKeyUp);

           


            
            // Animation loop
            const animate = () => {
              requestAnimationFrame(animate);
          
          
              let originalPosition = controls.getObject().position.clone();
          
              controls.moveRight(velocity.x * 1);  // Adjust speed as needed
              controls.moveForward(-velocity.z * 1);  // Adjust speed as needed
          

              const cameraBoundingBox = new THREE.Box3(
                new THREE.Vector3(camera.position.x - 0.5, camera.position.y - 0.5, camera.position.z - 0.5),
                new THREE.Vector3(camera.position.x + 0.5, camera.position.y + 0.5, camera.position.z + 0.5)
            );

              if (checkCollision(cameraBoundingBox,boundingBoxes)) {
                  controls.getObject().position.copy(originalPosition);
              }
          
              renderer.render(scene, camera);
          };
            animate();
        };

        init();

        return () => {

            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
        };
    }, []);

    return <>
    <MobileButtons/>
     <canvas ref={canvasRef}/>;
    </>
};

export default ThreeScene;