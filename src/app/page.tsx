"use client";
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import PictureFrame from './Components/PicFrame/PicFrame';

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pictureFrameRef : any = useRef();
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 5000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    if (containerRef.current?.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current?.appendChild(renderer.domElement);

    camera.position.set(0, 0, 5);

    // Lighting
    const ambientLight = new THREE.AmbientLight('white', 1);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight('white', 0);
    spotLight.position.set(0, 2, 2);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 10;
    spotLight.shadow.camera.fov = 30;
    scene.add(spotLight);

    const helper = new THREE.CameraHelper(spotLight.shadow.camera);
    scene.add(helper);

    // Skybox
    const textureLoader = new THREE.TextureLoader();
    const skyTexture = textureLoader.load('/materials/skye.jpg', () => {
      const materials = [
        new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide }),
      ];

      const skyBoxGeometry = new THREE.BoxGeometry(5000, 5000, 5000);
      const skyBox = new THREE.Mesh(skyBoxGeometry, materials);
      scene.add(skyBox);
    });

    // Wall
    const wallGeometry = new THREE.PlaneGeometry(5, 5);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 'white' });
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.z = -0.1;
    wall.receiveShadow = true;
    
    
    // Add the group to the scene
      const pictureFrame = pictureFrameRef && pictureFrameRef?.current?.createPictureFrame('https://th.bing.com/th/id/R.6641d892daaa187a726aacefd32f8420?rik=ZUW%2fOeCuvEWmKg&pid=ImgRaw&r=0');
      console.log('pictureFrame: ', pictureFrame);
      
      
      scene.add(wall,pictureFrame);
    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <>
 
   <PictureFrame ref={pictureFrameRef} />
  <div ref={containerRef} />;
  </>
};

export default ThreeScene;
