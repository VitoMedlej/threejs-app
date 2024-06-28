"use client";
import {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import MobileButtons from '../MobileButtons/MobileButtons';

export default function Home() {
    const canvasRef = useRef < any > (null);
    // const [movement,
    //     setMovement] = useState({});

    useEffect(() => {
        if (!canvasRef.current) 
            return;

        let isMovingRight= false;
        let isMovingLeft  = false;
        let isMovingForward = false;
        let isMovingBackward= false;
        
        // const velocity = new THREE.Vector3();
        const onKeyDown = (event : KeyboardEvent | any) => {

            switch (event.key) {
                    // case 'w':   controls.moveForward(1);   break; case 'a':
                    // controls.moveRight(-1);   break; case 's':   controls.moveForward(-1); break;
                    // case 'd':   controls.moveRight(1);   break;
                case 'w':
                        isMovingForward= true
                    break;
                case 'a':
                  isMovingRight= true
                  break;
                  case 's':
                    isMovingBackward= true
                    break;
                    case 'd':
                  isMovingLeft= true

                    break;
            }
        };
        const onKeyUp = (event : KeyboardEvent | any) => {
          switch (event.key) {
              case 'w':
              case 's':
                  isMovingForward = false;
                  isMovingBackward = false;
                  break;
              case 'a':
                isMovingRight = false;
                break;
                case 'd':
                isMovingLeft = false;
                  break;
          }
      };

        // Create a scene
        const scene = new THREE.Scene();

        // Create a camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Create a renderer

        let renderer = new THREE.WebGLRenderer({canvas: canvasRef.current, antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Create a geometry
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

        // Create a material
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

        // Create meshes
        const cube = new THREE.Mesh(boxGeometry, material);
        const sphere = new THREE.Mesh(sphereGeometry, material);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight
            .position
            .set(10, 20, 10);
        scene.add(directionalLight);

        // Camera
        camera
            .position
            .set(0, 10, 20); // Adjust position for better view

        const loader = new THREE.TextureLoader();
        // Renderer

        renderer.setSize(window.innerWidth, window.innerHeight);
        const texture2 = loader.load('/materials/wall.jpg');

        const texture3 = loader.load('/materials/moon.jpeg');
        const material3 = new THREE.MeshStandardMaterial({map: texture2});
        const texture5 = loader.load('/materials/money.jpeg');
        const material2 = new THREE.MeshStandardMaterial({map: texture5});
        const box = new THREE.BoxGeometry(8, 8, 8);

        const boxUser = new THREE.Mesh(box, material2);
        boxUser.position.x = 35;
        boxUser.position.z = 35;
        boxUser.position.y = 5;
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

        // Position the sphere
        sphere.position.x = 3;

        // Add the meshes to the scene
        scene.add(cube);
        scene.add(sphere);

        // Variables for touch controls
        let isDragging = false;
        const previousTouchPosition = {
            x: 0,
            y: 0
        };

        let pitch = 0;
        let yaw = 0;

        // if (isMovingBackward) {     camera.position.addScaledVector(direction,
        // -speed); } Listen for touchstart event
        window.addEventListener('touchstart', (e) => {
            isDragging = true;
            previousTouchPosition.x = e.touches[0].clientX;
            previousTouchPosition.y = e.touches[0].clientY;
        });

        // Listen for touchend event
        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Listen for touchmove event
        window.addEventListener('touchmove', (e) => {
            const currentTouchPosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };

            if (isDragging) {
                const deltaMove = {
                    x: currentTouchPosition.x - previousTouchPosition.x,
                    y: currentTouchPosition.y - previousTouchPosition.y
                };

                yaw += deltaMove.x * 0.01;
                pitch += deltaMove.y * 0.01;

                pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

                // Update camera rotation
                camera
                    .rotation
                    .set(pitch, yaw, 0, 'YXZ');
            }

            previousTouchPosition.x = currentTouchPosition.x;
            previousTouchPosition.y = currentTouchPosition.y;

        });

        const buttons : any = document.querySelectorAll('.mobile-button')

        buttons.forEach((button : any) => {
            button.addEventListener('touchstart', (e : any) => {
                onKeyDown({
                    key: `${e.target
                        ?.id}`
                })
            })
            button.addEventListener('touchend', (e : any) => {
                onKeyUp({
                    key: `${e.target
                        ?.id}`
                })
            })
        })

        let speed = 0.5;

        // Animation loop
        const animate = () => {
            // camera.position.z -=0.1;
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            camera.position.y = 10;

            var direction = new THREE.Vector3();
            camera.getWorldDirection(direction);

            var right = new THREE.Vector3();
            right
                .crossVectors(camera.up, direction)
                .normalize();

                if (isMovingRight) {
                  camera
                  .position
                  .addScaledVector(right, speed);
                }
                
                if (isMovingLeft) {
                camera
                    .position
                    .addScaledVector(right, -speed);
            }

            if (isMovingForward) {
                camera
                    .position
                    .addScaledVector(direction, speed);
            }

            if (isMovingBackward) {
                camera
                    .position
                    .addScaledVector(direction, -speed);
            }

        };

        animate();

        // Cleanup on unmount
        return () => {
            window.removeEventListener('touchstart', () => {});
            window.removeEventListener('touchend', () => {});
            window.removeEventListener('touchmove', () => {});
            renderer.dispose();
            material.dispose();
            boxGeometry.dispose();
            sphereGeometry.dispose();
        };
    }, []);

    return <> <MobileButtons/> < canvas ref = {
        canvasRef
    }
    style = {{ width: '100vw', height: '100vh' }}/>
  </ >
};
