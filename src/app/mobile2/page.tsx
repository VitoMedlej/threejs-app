"use client";
import {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import MobileButtons from '../MobileButtons/MobileButtons';
import { OBJLoader } from 'three-stdlib';
import PictureFrame from '../Components/PicFrame/PicFrame';

export default function Home() {
    const canvasRef = useRef < any > (null);
    // const [movement,
    //     setMovement] = useState({});
    const pictureFrameRef : any = useRef();

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


        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight
            .position
            .set(10, 20, 10);
        scene.add(directionalLight);

        // Camera
        camera
            .position
            .set(0, 10, 20); // Adjust position for better view


        renderer.setSize(window.innerWidth, window.innerHeight);
   

 

 
        const loader = new THREE.TextureLoader();

      const objectLoader = new OBJLoader();



const t1 = loader.load('/chair/fabric_blue_diffuse.png');
const t2 = loader.load('/chair/RVWood 1_baseColor.jpg');
const t3 = loader.load('/chair/RVWood 1_roughness.jpg');
const t4 = loader.load('/chair/RVWood 1_normal.png');

// Create materials using your textures
// const mat1 = new THREE.MeshBasicMaterial({ map: t1 });


// const red = new THREE.MeshBasicMaterial({ color : 'red' });


const mat2 = new THREE.MeshPhongMaterial({ map: t2, specularMap: t3, bumpMap: t4 });
const texture3 = loader.load("/materials/floor.jpg", function (texture) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.offset.set(0, 0);
  texture.repeat.set(6, 6);
});
const whiteWood = loader.load("/materials/whitewood.jpg", function (texture) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.offset.set(0, 0);
  texture.repeat.set(6, 6);
});
const glass = loader.load("/materials/glass.jpeg");

// const textureSofaSeat = loader.load("/chair/Textures/Arp_Fabric_Disiplace.jpg");
// const textureChairArp  = loader.load("/chair/Textures/Arp_Pillow_Fabric_Mask.jpg");




// const texture1 = loader.load('path/to/texture1.jpg');
// const texture2 = loader.load('path/to/texture2.jpg');
const tt2 = loader.load('path/to/texture3.jpg');
// const texture4 = loader.load('path/to/texture4.jpg');
const texture5 = loader.load('https://th.bing.com/th/id/R.fdf42b17da71bec5f47e2d95dac343bd?rik=XTCSDuQHDblFFQ&pid=ImgRaw&r=0');
const texture6 = loader.load('https://ucarecdn.com/1eb176cc-44c7-431a-b56a-845cad415996/jpeg.webp');
const wallTexture = loader.load("/materials/white.jpeg");

const texture7 = loader.load('/vase/Baked_1.png');

// const texturesMap = {
//   "3d71da71-ea68-4c15-a9c6-6610e98f58f0": texture1,
//   "3779c9a5-8211-4611-8d8b-30728951cfa7": texture2,
//   "a1a345b4-7de2-4c7b-a091-d43f65cdfcf7": tt2,
//   "b7612914-e1f8-4a92-8efa-98819c481a5d": texture4,
//   "47f65597-a7ec-4916-9298-27c8c769453d": texture5,
//   "6b19890d-5c28-4adb-b8ed-922a6308c9c3": texture6
// };
const colorList : any = [
  texture6,
  wallTexture
  // textureChairArp,

  // 0xff0000, // red
  // 0x0000ff, // blue
  // 0x00ff00, // green
  // 0xffff00, // yellow
  // 0xff00ff, // magenta
];
// objectLoader.load('/chair/Obj.obj', (object: THREE.Group) => {
//   let colorIndex = 0;

//   object.traverse((node) => {
//     console.log('node: ', node);

//     if (node instanceof THREE.Mesh) {
//       const material = new THREE.MeshStandardMaterial({ map: colorList[colorIndex], color: colorList[colorIndex], wireframe: false });
//       colorIndex = (colorIndex + 1) % colorList.length;

//       if (Array.isArray(node.material)) {
//         node.material.forEach((mat, index) => {
//           node.material[index] = material;
//         });
//       } else {
//         node.material = material;
//       }
//     }
//   });

//   object.scale.set(0.015, 0.015, 0.015);
//   object.position.set(3, 1, 10);
//   scene.add(object);
// });


objectLoader.load('/chair/Table1.obj', (object) => {

  object.traverse((node) => {
    if ((node as THREE.Mesh).isMesh) {
      let mesh = node as THREE.Mesh;
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material) => {
          if (material instanceof THREE.MeshPhongMaterial) {
            if (material.name === 'Glass.001') {
              material.map = glass;
              material.needsUpdate = true;
            } else if (material.name === 'cgbookcase/Wood_07/2K.001') {
              material.map = whiteWood;
              material.needsUpdate = true;
            }
          }
        });
      } else {
        if (mesh.material instanceof THREE.MeshPhongMaterial) {
          if (mesh.material.name === 'Glass.001') {
            mesh.material.map = glass;
            mesh.material.needsUpdate = true;
          } else if (mesh.material.name === 'cgbookcase/Wood_07/2K.001') {
            mesh.material.map = whiteWood;
            mesh.material.needsUpdate = true;
          }
        }
      }
      mesh.castShadow = true; // this mesh will cast shadows
      mesh.receiveShadow = true; // this mesh will receive shadows
    }
  });

  object.position.set(15,0,-25);

  object.scale.set(15,15,15);

  scene.add(object);
});




objectLoader.load('/vase/Obj.obj', (object) => {
  object.traverse((node) => {
    if ((node as THREE.Mesh).isMesh) {
      let mesh = node as THREE.Mesh;
      console.log('node: ', node.name);
      
      // Apply texture to the vase
      if (node.name === 'vase_Cylinder.005') {
        mesh.material = new THREE.MeshStandardMaterial({ map: texture6 });
      }
      if (node.name === 'leaf__Cylinder.006') {
        mesh.material = new THREE.MeshStandardMaterial({ map: texture5 });
      }
      if (node.name === 'stalk_1_Cylinder.009' ||
        node.name === 'petals_3_Cylinder.002' || 
        node.name === 'petals_2_Cylinder.004' || 
        node.name === 'pistils_2_Cylinder.011' || 
        node.name === 'stalk_2_Cylinder.009' || 
        node.name === 'pistils_3_Cylinder.011' || 
        node.name === 'pistils__Cylinder.010' || 
        node.name === 'water_Cylinder.001' || 
        node.name === 'petals_1_Cylinder.003' || 
        
        node.name === 'stalk_3_Cylinder.007' || 
         node.name === '2_Cylinder.008') {
        mesh.material = new THREE.MeshStandardMaterial({ map: texture7 });
      }
      // if (node.name === 'pistils__Cylinder.010') {
      //   mesh.material = new THREE.MeshStandardMaterial({ map: texture7 });
      // }
      

      mesh.castShadow = true; // this mesh will cast shadows
    }
  });

  object.position.set(5, 5, 30);
  object.scale.set(1, 1, 1);

  scene.add(object);
});
  




      const ambientLight = new THREE.AmbientLight("#fafafa", .2);
      scene.add(ambientLight);

     
      const light = new THREE.DirectionalLight('white', 1 );
            light.castShadow = true;

            light.position.y = 20;

      const lighthelper = new THREE.DirectionalLightHelper(light) 
      scene.add(light,lighthelper);
    

      // Renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,antialias: true
      });

      renderer.setSize(window.innerWidth, window.innerHeight);



      const wallMaterial = new THREE.MeshStandardMaterial({
        map: wallTexture,
    });

    //   const texture5 = loader.load("/materials/money.jpeg");
      const material2 = new THREE.MeshStandardMaterial({
        color: 0xa8a8a8,
        emissive: 0x000000,
      });

      const box = new THREE.IcosahedronGeometry(3);

      const boxUser = new THREE.Mesh(box, material2);
      boxUser.position.x = 5;
      boxUser.position.z = 5;
      boxUser.position.y = 5;
      scene.add(boxUser);

      // const load = new FontLoader();
      // load.load(
      //   "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      //   function (font) {
      //     const geometry = new TextGeometry("Hello three.js!", {
      //       font: font,
      //       size: 4, // Smaller size
      //       depth: 0,
      //       curveSegments: 10, // More curve segments
      //       bevelEnabled: false,
      //       bevelThickness: 1, // Smaller bevel
      //       bevelSize: 1, // Smaller bevel
      //       bevelOffset: 0,
      //       bevelSegments: 2,
      //     });

      //     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

      //     const text = new THREE.Mesh(geometry, material);
      //     text.position.y = 10;
      //     scene.add(text);
      //     console.log(font);
      //   }
      // );

      

      const terrainGeometry = new THREE.PlaneGeometry(100, 100, 50, 100);
      const terrainMaterial = new THREE.MeshStandardMaterial({ map: texture3 });

      const ceilingGeo = new THREE.PlaneGeometry(100, 100, 50, 100);
      const ceilingMaterial = new THREE.MeshStandardMaterial({ map: wallTexture , side: THREE.DoubleSide , wireframe:false });
      
      const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);

      const ceiling = new THREE.Mesh(ceilingGeo, ceilingMaterial);


      ceiling.position.set(0,60,0)
      terrain.rotation.x = -Math.PI / 2; // Rotate to lay flat
      ceiling.rotation.x = -Math.PI / 2; // Rotate to lay flat

      terrain.receiveShadow = true;
      

      
      scene.add(terrain,ceiling);



      const tt = loader.load("/materials/skye.jpg");

      const materials = [
        new THREE.MeshBasicMaterial({ map: tt, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: tt, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: tt, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: tt, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: tt, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: tt, side: THREE.BackSide }),
      ];

      const skyBoxGeometry = new THREE.BoxGeometry(5000, 5000, 5000);
      const skyBox = new THREE.Mesh(skyBoxGeometry, materials);
      const wallGeometry = new THREE.BoxGeometry(100, 80, 1.2);
      scene.add(skyBox);

      const obstacles = [];
      const boundingBoxes: any = [];

      const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
      const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
      const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
      const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);

      wall1.position.set(0, 20, 50); // Top wall
      wall2.position.set(0, 20, -50); // Bottom wall
      wall3.position.set(-50, 20, 0); // Left wall
      wall4.position.set(50, 20, 0); // Right wall

      wall3.rotation.y = Math.PI / 2; // Rotate to be vertical
      wall4.rotation.y = Math.PI / 2; // Rotate to be vertical


      
     

      const pictureFrameGroup2 = pictureFrameRef.current.createPictureFrame({
        textureURL: 'https://th.bing.com/th/id/R.6641d892daaa187a726aacefd32f8420?rik=ZUW%2fOeCuvEWmKg&pid=ImgRaw&r=0',
        frameSize: {
          thickness: 0.5,
          depth: 0.5,
          length: 12
        },
        pictureSize: {
          width: 10,
          height: 10
        },
        backgroundSize: {
          width: 11,
          height: 11
        }
        ,
        location: {
          x: 0,
          y: 10,
          z: -49,
        }
      });
      

      scene.add(wall1, pictureFrameGroup2, wall2, wall3, wall4);
      obstacles.push(wall1, wall2, wall3, wall4);

      obstacles.forEach((obstacle) => {
        const boundingBox = new THREE.Box3().setFromObject(obstacle);
        boundingBoxes.push(boundingBox);
      });

      const checkCollision = (cameraBoundingBox: any, boundingBoxes: any) => {
        for (let i = 0; i < boundingBoxes.length; i++) {
          if (cameraBoundingBox.intersectsBox(boundingBoxes[i])) {
            return true;
          }
        }
        return false;
      };









 
    

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

    return <> 
   <PictureFrame ref={pictureFrameRef} />
    
    <MobileButtons/> < canvas ref = {
        canvasRef
    }
    style = {{ width: '100vw', height: '100vh' }}/>
  </ >
};
