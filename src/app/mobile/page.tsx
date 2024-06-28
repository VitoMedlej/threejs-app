"use client"

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Home() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Create a geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // Create a material
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // Create a mesh
    const cube = new THREE.Mesh(geometry, material);

    // Add the mesh to the scene
    scene.add(cube);

    // Listen to touchmove event for mobile
    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const touch = event.touches[0];
      camera.rotation.y = touch.pageX * 0.01;
      camera.rotation.x = touch.pageY * 0.01;
    };

    window.addEventListener('touchmove', onTouchMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);

  return <div ref={canvasRef} />;
}
