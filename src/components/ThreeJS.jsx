import { useEffect, useRef, useContext } from 'react';
import { gsap } from 'gsap/gsap-core';
import { BaseUrlContext } from '../context/BaseUrlContext';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import PropType from 'prop-types';
import * as dat from 'lil-gui';


ThreeJS.propTypes = {
  className: PropType.string
};

export default function ThreeJS({ className }) {
  const container = useRef();
  const baseUrl = useContext(BaseUrlContext);

  useEffect(() => {
    const threeSceneResult = threeScene();
    const threeRenderer = threeSceneResult.renderer;
    const gui = threeSceneResult.gui;

    return () => {
      threeRenderer.domElement.remove();
      gui.destroy();

    };
  }, []);

  const threeScene = () => {

    let scene,camera,controls

    const renderer = new THREE.WebGLRenderer({ antialias: true },{ alpha: true });
    const gui=new dat.GUI();

    async function init()
    {
      try{
        // #region renderer
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(gsap.getProperty(container.current, 'width'), gsap.getProperty(container.current, 'height'));
        container.current.appendChild(renderer.domElement);
        // #endregion

        scene = new THREE.Scene();
        scene.position.set(0, 0, 0);

        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        scene.environment = pmremGenerator.fromScene(new RoomEnvironment(),1).texture;


        const mainCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
        mainCamera.position.set(0,0,15);
        camera = mainCamera;

        const mainControls = new OrbitControls(mainCamera, renderer.domElement);
        mainControls.enableDamping = true;
        mainControls.enableZoom = false;
        mainControls.enablePan = false;
        mainControls.enableRotate = true;
        mainControls.rotateSpeed = 0.3;
        // controls.autoRotate = true;
        // controls.autoRotateSpeed = 2;
        controls = mainControls;

        const model = await loadModel(`${baseUrl}/model/unicorn gumroad-modified.glb`);

        model.scale.set(42, 42, 42);
        model.castShadow = true;
        scene.add(model);

        mainControls.target=new THREE.Vector3( model.position.x, model.position.y, model.position.z );

        // #region Light
        const light = new THREE.DirectionalLight(0x52663c, 1); // soft white light
        light.position.set(15, 20, 0);
        light.castShadow = true;

        light.shadow.mapSize.width = 512; // default
        light.shadow.mapSize.height = 512; // default
        scene.add(light);
        // #endregion

        function help()
        {
            // const helperCamera = new THREE.CameraHelper(camera);
            // scene.add(helperCamera);
            const devCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
            devCamera.position.set(0,0,15);
            devCamera.lookAt(scene.position);
            // camera=devCamera

            console.log(camera);
            //FIXME
            // const devControls = new FlyControls(devCamera, renderer.domElement);
            // devControls.movementSpeed = 25;
            // devControls.domElement = renderer.domElement;
            // devControls.rollSpeed = Math.PI / 24;
            // devControls.autoForward = false;
            // devControls.dragToLook = true;
            // controls=devControls

            // window.addEventListener('keydown', (event) => {
            //   if (event.key === 'c') {
            //     camera = (camera === mainCamera) ? devCamera : mainCamera;
            //     controls.enabled = false
            //     controls = (controls === mainControls) ? devControls : mainControls;
            //     controls.enabled = true
            //     console.log('Switching camera:', camera === mainCamera ? 'Main Camera' : 'Development CameraHelper')
            //   }
            // });


            const helper = new THREE.DirectionalLightHelper(light, 5);
            scene.add(helper);

            return
            const transformControls = new TransformControls(mainCamera, renderer.domElement);
            scene.add(transformControls);
            transformControls.mode='translate';

            transformControls.addEventListener('dragging-changed', function (event) {
              controls.enabled = !event.value;
            });

            gui.add(transformControls, 'mode', { 'Translate': 'translate', 'Rotate': 'rotate', 'Scale': 'scale' }).name('Control Mode');

            // #region model
            transformControls.attach(model);
            const modelFolder = gui.addFolder('Model');
            const positionXController = modelFolder.add(model.position, 'x', -10, 10).name('Position X');
            const positionYController = modelFolder.add(model.position, 'y', -10, 10).name('Position Y');
            const positionZController = modelFolder.add(model.position, 'z', -10, 10).name('Position Z');
            const rotationXController = modelFolder.add(model.rotation, 'x', -Math.PI, Math.PI).name('Rotation X');
            const rotationYController = modelFolder.add(model.rotation, 'y', -Math.PI, Math.PI).name('Rotation Y');
            const rotationZController = modelFolder.add(model.rotation, 'z', -Math.PI, Math.PI).name('Rotation Z');
            const scaleXController = modelFolder.add(model.scale, 'x', 0.1, 100).name('Scale X');
            const scaleYController = modelFolder.add(model.scale, 'y', 0.1, 100).name('Scale Y');
            const scaleZController = modelFolder.add(model.scale, 'z', 0.1, 100).name('Scale Z');
            modelFolder.open();
            // #endregion

            // #region model
            transformControls.attach(light);
            const lightFolder = gui.addFolder('Light');
            const lightIntensityController = lightFolder.add(light, 'intensity', 0, 1).name('Intensity');
            const lightColorController = lightFolder.addColor(light, 'color').name('Color');
            const lightPositionXController = lightFolder.add(light.position, 'x', -10, 10).name('Position X');
            const lightPositionYController = lightFolder.add(light.position, 'y', -10, 10).name('Position Y');
            const lightPositionZController = lightFolder.add(light.position, 'z', -10, 10).name('Position Z');
            const lightRotationXController = lightFolder.add(light.rotation, 'x', -Math.PI, Math.PI).name('Rotation X');
            const lightRotationYController = lightFolder.add(light.rotation, 'y', -Math.PI, Math.PI).name('Rotation Y');
            const lightRotationZController = lightFolder.add(light.rotation, 'z', -Math.PI, Math.PI).name('Rotation Z');
            const lightScaleXController = lightFolder.add(light.scale, 'x', 0.1, 100).name('Scale X');
            const lightScaleYController = lightFolder.add(light.scale, 'y', 0.1, 100).name('Scale Y');
            const lightScaleZController = lightFolder.add(light.scale, 'z', 0.1, 100).name('Scale Z');
            lightFolder.open();
            // #endregion

            transformControls.addEventListener('change', function () {
              positionXController.updateDisplay();
              positionYController.updateDisplay();
              positionZController.updateDisplay();
              rotationXController.updateDisplay();
              rotationYController.updateDisplay();
              rotationZController.updateDisplay();
              scaleXController.updateDisplay();
              scaleYController.updateDisplay();
              scaleZController.updateDisplay();

              lightIntensityController.updateDisplay();
              lightColorController.updateDisplay();
              lightPositionXController.updateDisplay();
              lightPositionYController.updateDisplay();
              lightPositionZController.updateDisplay();
              lightRotationXController.updateDisplay();
              lightRotationYController.updateDisplay();
              lightRotationZController.updateDisplay();
              lightScaleXController.updateDisplay();
              lightScaleYController.updateDisplay();
              lightScaleZController.updateDisplay();
            });
        }

        help()
        console.log('init is done')
      }
      catch(error){
        console.log('An error happened');
        console.log(error);
      }
    }

    function loadModel(url) {
      return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(
          url,
          gltf => {
            const model = new THREE.Group();
            gltf.scene.position.set(0.015, -0.08, 0);
            gltf.scene.rotateY(-Math.PI);
            model.add(gltf.scene);

            resolve(model)
          }, // 當模型加載完成時，我們解析Promise
          undefined,
          error => reject(error) // 如果有錯誤，我們拒絕Promise
        );
      });
    }


    const update = () => {
      requestAnimationFrame(update);

      camera.updateProjectionMatrix();
      controls.update();
      renderer.render(scene, camera);
    };


    init();
    update();

    return {renderer:renderer,gui:gui};
  }

  return (
    <div className={`${className}`}>
      <div id="three-js-container" ref={container} className="dev-red" />
    </div>
  );
}
