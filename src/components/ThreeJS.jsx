import { useEffect, useRef, useContext } from 'react';
import { gsap } from 'gsap/gsap-core';
import { BaseUrlContext } from '../context/BaseUrlContext';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
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
            const helperGrid = new THREE.GridHelper(100, 100, 0x888888, 0x444444);
            scene.add(helperGrid);

            const helperLight = new THREE.DirectionalLightHelper(light, 5);
            scene.add(helperLight);

            const helperCamera = new THREE.CameraHelper(mainCamera);
            scene.add(helperCamera);

            const devCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            devCamera.position.set(0,0,15);
            devCamera.lookAt(scene.position);

            const devControls = new TrackballControls(devCamera, renderer.domElement);
            devControls.rotateSpeed = 0.5;
            devControls.zoomSpeed = 0.5;
            devControls.panSpeed = 0.5;
            devControls.keys = ['KeyA', 'KeyS', 'KeyD'];

            const transformControls = new TransformControls(mainCamera, renderer.domElement);
            scene.add(transformControls);

            transformControls.addEventListener('dragging-changed', function (event) {
              controllers.enabled = !event.value;
            });

            const targets = {
              Model: model,
              Light: light,
            };

            gui.add(transformControls, 'mode',{ Translate: 'translate', Rotate: 'rotate', Scale: 'scale' })
                .name('Control Mode')
                .setValue('translate')

            const controllers=[]
            const folders=[]

            Object.keys(targets).forEach((name) => {
              const target = targets[name];
              const folder = gui.addFolder(name);
              folders.push({name, folder});

              ['x', 'y', 'z'].forEach(axis => {
                controllers.push(folder.add(target.position, axis, -10, 10).name(`Position ${axis.toUpperCase()}`));
                controllers.push(folder.add(target.rotation, axis, -Math.PI, Math.PI).name(`Rotation ${axis.toUpperCase()}`));
                controllers.push(folder.add(target.scale, axis, 0.1, 100).name(`Scale ${axis.toUpperCase()}`));
              });

              if (name === 'Light') {
                controllers.push(folder.add(target, 'intensity', 0, 1).name('Intensity'));
                controllers.push(folder.addColor(target, 'color').name('Color'));
              }

              folder.close();
            });

            gui.onOpenClose( changedGUI => {
              let current = null;
              if(!changedGUI._closed)
              {
                folders.forEach((folder) => {
                  folder.folder.close();
                });

                current = targets[changedGUI._title];
                if(current) transformControls.attach(current);
              }
            } );

            transformControls.addEventListener('change', function () {
              controllers.forEach((control) => {
                control.updateDisplay();
              });
            });

            window.addEventListener('keydown', (event) => {
              if (event.key === 'c') {
                camera = (camera === mainCamera) ? devCamera : mainCamera;
                controls.enabled = false
                controls = (controls === mainControls) ? devControls : mainControls;
                controls.enabled = true
                console.log('Switching camera:', camera === mainCamera ? 'Main Camera' : 'Development CameraHelper')
              }

              if (event.key === 'i') {
                const savedState = gui.save();

                // 輸出或保存狀態
                console.log(savedState);
              }
            });

        }

        console.log('init is done')
        help()
        update();
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

    function update() {
      requestAnimationFrame(update);
      camera.updateProjectionMatrix();
      controls.update();
      renderer.render(scene, camera);
    };

    init();

    return {renderer:renderer,gui:gui};
  }

  return (
    <div className={`${className}`}>
      <div id="three-js-container" ref={container} className="dev-red" />
    </div>
  );
}
