"use client"
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/materials/moon.jpeg');
    camera.position.z = 1;
    const gridHelper = new THREE.GridHelper(1)

    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight, gridHelper);



const directionalLight = new THREE.DirectionalLight(0xffffff, .6);
directionalLight.position.set(1, .1, 1);



   

    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);
    // containerRef?.current?.appendChild(renderer.domElement);
    if (containerRef?.current?.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    
    // Append the new canvas
    containerRef?.current?.appendChild(renderer.domElement);
    const geometry = new THREE.SphereGeometry(.25, 64, 64);


    const material = new THREE.MeshStandardMaterial({ wireframe:false, map: texture  });
    // const backgroundTexture = textureLoader.load('/materials/space.jpg');
    // scene.background = backgroundTexture;



    const cube = new THREE.Mesh(geometry, material);
  
    const controls = new OrbitControls(camera, renderer.domElement);
    scene.add(cube, directionalLight);
    // cube.position.z = 1;
    const animate = function () {
      requestAnimationFrame(animate);
      // cube.rotation.x += 0.001;
      cube.rotation.y += 0.003;
      cube.rotation.z += 0.003;
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
  }, []);
  
  return <div ref={containerRef} />;
};

export default ThreeScene;