"use client"
import React, { forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';

const PictureFrame = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    createPictureFrame({textureURL  , frameSize  , pictureSize  , backgroundSize, location } : any) {
      const textureLoader = new THREE.TextureLoader();
      const pictureTexture = textureLoader.load(textureURL);
      const pictureMaterial = new THREE.MeshStandardMaterial({ map: pictureTexture });
      const picMat = new THREE.MeshPhongMaterial({ color: 'white' });

      const pictureGeometry = new THREE.BoxGeometry(pictureSize.width, pictureSize.height, 0.1);
      const picBackground = new THREE.BoxGeometry(backgroundSize.width, backgroundSize.height, 0.1);

      const picbg = new THREE.Mesh(picBackground, picMat);
      const picture = new THREE.Mesh(pictureGeometry, pictureMaterial);

      picbg.position.set(0, 0, 0.05); // Slightly in front of the wall
      picture.position.set(0, 0, 0.06); // Slightly in front of the background

      picbg.castShadow = true;
      picbg.receiveShadow = true;
      picture.castShadow = true;
      picture.receiveShadow = true;

      const frameMaterial = new THREE.MeshStandardMaterial({ color: 'black' });
      const frameThickness = frameSize.thickness;
      const frameDepth = frameSize.depth;
      const frameLength = frameSize.length;

      const topFrameGeometry = new THREE.BoxGeometry(frameLength, frameThickness, frameDepth);
      const topFrame = new THREE.Mesh(topFrameGeometry, frameMaterial);
      topFrame.position.set(0, backgroundSize.height / 2 + frameThickness / 2, 0.03);
      topFrame.castShadow = true;
      topFrame.receiveShadow = true;

      const bottomFrame = topFrame.clone();
      bottomFrame.position.set(0, -backgroundSize.height / 2 - frameThickness / 2, 0.03);

      const sideFrameGeometry = new THREE.BoxGeometry(frameThickness, frameLength, frameDepth);
      const leftFrame = new THREE.Mesh(sideFrameGeometry, frameMaterial);
      leftFrame.position.set(-backgroundSize.width / 2 - frameThickness / 2, 0, 0.03);
      leftFrame.castShadow = true;
      leftFrame.receiveShadow = true;

      const rightFrame = leftFrame.clone();
      rightFrame.position.set(backgroundSize.width / 2 + frameThickness / 2, 0, 0.03);

      const pictureFrameGroup = new THREE.Group();

      pictureFrameGroup.position.set(location.x, location.y, location.z);
      // Add the picture and frame to the group
      pictureFrameGroup.add(picbg, picture, topFrame, bottomFrame, leftFrame, rightFrame);

      pictureFrameGroup.castShadow = true;
      pictureFrameGroup.receiveShadow = true;

      pictureFrameGroup.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });

      return pictureFrameGroup;
    }
  }));

  return null;
});

export default PictureFrame;
