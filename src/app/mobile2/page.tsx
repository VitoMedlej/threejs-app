"use client";

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { DeviceOrientationControls } from 'three-stdlib';

const ThreeScene = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
        let controls: DeviceOrientationControls | null = null;

        const init = () => {
            scene = new THREE.Scene();

            // Add ambient light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);

            // Add directional light
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(5, 10, 7.5);
            scene.add(directionalLight);

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 1.6, 3); // Adjust the camera position

            renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current! });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            controls = new DeviceOrientationControls(camera);
            controls.connect(); // Connect controls to device orientation

            // Add your 3D objects here
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            animate();
        };

        const animate = () => {
            requestAnimationFrame(animate);

            if (controls) controls.update();

            renderer.render(scene, camera);
        };

        init();

        const onWindowResize = () => {
            if (camera) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            }
            if (renderer) renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
            if (controls) {
                controls.disconnect(); // Disconnect controls when unmounting
                controls.dispose();
            }
            if (renderer) renderer.dispose();
        };
    }, [canvasRef]);

    return <canvas ref={canvasRef} />;
};

export default ThreeScene;
