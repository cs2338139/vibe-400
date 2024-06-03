import { useEffect, useRef, useContext } from 'react';
import { BaseUrlContext } from '../context/BaseUrlContext';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import PropType from 'prop-types';

ThreeJS.propTypes = {
  className: PropType.string
};

export default function ThreeJS({ className }) {
  const container = useRef();
  const baseUrl = useContext(BaseUrlContext);

  useEffect(() => {
    const renderer = threeCreate();

    return () => {
      // 在组件卸载或者重新渲染之前，移除旧的 canvas
      renderer.domElement.remove();
    };
  }, []);

  function threeCreate() {
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    camera.position.x = 30;
    camera.position.y = 30;
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer(
      { antialias: true },
      { alpha: true }
    );
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.current.appendChild(renderer.domElement);
    renderer.setClearColor(0x000000, 0);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    const scene = new THREE.Scene();

    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      1
    ).texture;

    scene.position.set(0, 15, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    // controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 40;
    controls.maxDistance = 40;
    controls.target = new THREE.Vector3(0, 7, 0);

    controls.enableRotate = true;
    controls.rotateSpeed = 0.3;

    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;

    const loader = new GLTFLoader();
    loader.load(
      `${baseUrl}/model/35mm_film_roll.glb`,

      function (object) {
        console.log('model is onLoad');
        const model = object.scene;

        model.position.set(0, 0, 0);
        model.scale.set(50, 50, 50);
        model.castShadow = true;
        scene.add(model);
      },
      undefined,
      function (error) {
        console.log('An error happened');
        console.log(error);
      }
    );

    // #region Light
    // lightning and casting shadows
    const light = new THREE.DirectionalLight(0x52663c, 0.5); // soft white light
    light.position.set(15, 20, 0);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;

    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    scene.add(light);
    scene.add(light.target);
    // #endregion

    // #region Help
    // grid helper
    const gridHelper = new THREE.GridHelper(200, 50); // add a grid
    scene.add(gridHelper);
    // light helper
    const helper = new THREE.DirectionalLightHelper(light, 5);
    scene.add(helper);

    const helperCamera = new THREE.CameraHelper(camera);
    scene.add(helperCamera);
    // #endregion

    const animate = () => {
      requestAnimationFrame(animate);

      camera.updateProjectionMatrix();
      renderer.setSize(1600, 800);

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return renderer;
  }

  return (
    <div className={`${className} `}>
      <div id="three-js-container" ref={container} className="" />
    </div>
  );
}
