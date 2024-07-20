/* eslint-disable no-inner-declarations */
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
      threeSceneResult.removeEventListenerResize();
      gui.destroy();
    };
  }, []);

  const threeScene = () => {
    let scene, camera, controls;

    const renderer = new THREE.WebGLRenderer(
      { antialias: true },
      { alpha: true }
    );
    const gui = new dat.GUI();

    function addEventListenerResize() {
      window.addEventListener('resize', onWindowResize, false);
    }

    function removeEventListenerResize() {
      window.addEventListener('resize', onWindowResize, false);
    }

    async function init() {
      try {
        // #region renderer
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(
          gsap.getProperty(container.current, 'width'),
          gsap.getProperty(container.current, 'height')
        );
        container.current.appendChild(renderer.domElement);
        // #endregion

        scene = new THREE.Scene();
        scene.position.set(0, 0, 0);

        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        scene.environment = pmremGenerator.fromScene(
          new RoomEnvironment(),
          1
        ).texture;

        const mainCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
        mainCamera.position.set(0, 0, 15);
        camera = mainCamera;

        const mainControls = new OrbitControls(mainCamera, renderer.domElement);
        mainControls.enableDamping = true;
        mainControls.enableZoom = false;
        mainControls.enablePan = false;
        mainControls.enableRotate = true;
        mainControls.rotateSpeed = 0.3;
        mainControls.autoRotate = true;
        mainControls.autoRotateSpeed = 2;
        controls = mainControls;

        const model = await loadModel(
          `${baseUrl}/model/unicorn gumroad-modified.glb`
        );

        model.scale.set(42, 42, 42);
        model.castShadow = true;
        scene.add(model);

        mainControls.target = new THREE.Vector3(
          model.position.x,
          model.position.y,
          model.position.z
        );

        // #region Light
        const light = new THREE.DirectionalLight(0x52663c, 1); // soft white light
        light.position.set(15, 20, 0);
        light.castShadow = true;

        light.shadow.mapSize.width = 512; // default
        light.shadow.mapSize.height = 512; // default
        scene.add(light);
        // #endregion

        function help() {
          const helperGrid = new THREE.GridHelper(100, 100, 0x888888, 0x444444);
          const helperLight = new THREE.DirectionalLightHelper(light, 5);
          const helperCamera = new THREE.CameraHelper(mainCamera);

          const devCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
          devCamera.position.set(0, 0, 15);
          devCamera.lookAt(scene.position);

          const devControls = new TrackballControls(
            devCamera,
            renderer.domElement
          );
          devControls.rotateSpeed = 0.5;
          devControls.zoomSpeed = 0.5;
          devControls.panSpeed = 0.5;
          // devControls.keys = ['KeyA', 'KeyS', 'KeyD'];

          const transformControls = new TransformControls(
            mainCamera,
            renderer.domElement
          );
          scene.add(transformControls);

          transformControls.addEventListener(
            'dragging-changed',
            function (event) {
              controls.enabled = !event.value;
            }
          );

          //TAG: modes ///
          const modes = {
            play: {
              camera: mainCamera,
              controls: mainControls,
              folder: null,
              action: () => {
                scene.remove(helperGrid);
                scene.remove(helperLight);
                scene.remove(helperCamera);
              }
            },
            development: {
              camera: devCamera,
              controls: devControls,
              folder: null,
              action: () => {
                scene.add(helperGrid);
                scene.add(helperLight);
                scene.add(helperCamera);
              }
            }
          };

          gui
            .add({ mode: {} }, 'mode', modes)
            .name('Mode')
            .setValue('play')
            .onChange((value) => {
              camera = value.camera;
              controls.enabled = false;
              controls = value.controls;
              controls.enabled = true;
              value.action();
              Object.values(modes).forEach((mode) => {
                if (mode === value) {
                  mode.folder.open().show();
                } else {
                  mode.folder.close().hide();
                }
              });
            });

          modes.play.folder = gui.addFolder('Play Options');
          modes.play.folder
            .add(mainControls, 'rotateSpeed', 0.1, 1, 0.1)
            .name('Rotate Speed')
            .setValue(0.3);
          modes.play.folder
            .add(mainControls, 'autoRotate')
            .name('Auto Rotate')
            .setValue(true);
          modes.play.folder
            .add(mainControls, 'autoRotateSpeed', 0.1, 20, 0.1)
            .name('Auto Rotate Speed')
            .setValue(2);

          modes.development.folder = gui.addFolder('Dev Options').hide();
          modes.development.folder
            .add(
              {
                reset: () => {
                  modes.development.camera.position.set(0, 0, 15);
                }
              },
              'reset'
            )
            .name('Reset DEV Camera');

          //TAG: targets ///
          const targets = {
            none: {
              target: null,
              folder: null
            },
            model: {
              target: model,
              folder: null
            },
            light: {
              target: light,
              folder: null
            }
          };
          let controlMode = null;

          gui
            .add({ target: {} }, 'target', targets)
            .name('Target')
            .setValue('none')
            .onChange((value) => {
              Object.values(targets).forEach((target) => {
                if (!target.target) {
                  transformControls.detach();
                  controlMode.hide();
                  return;
                }
                controlMode.show();
                if (target === value) {
                  transformControls.attach(target.target);
                  target.folder.open().show();
                } else {
                  target.folder.close().hide();
                }
              });
            });

          controlMode = gui
            .add(transformControls, 'mode', {
              Translate: 'translate',
              Rotate: 'rotate',
              Scale: 'scale'
            })
            .name('Control Mode')
            .setValue('translate')
            .hide();

          Object.keys(targets).forEach((name) => {
            if (name === 'none') return;
            const target = targets[name].target;
            const folder = gui.addFolder(name);
            targets[name].folder = folder;

            ['position', 'rotation', 'scale'].forEach((property) => {
              ['x', 'y', 'z'].forEach((axis) => {
                switch (property) {
                  case 'position': {
                    folder
                      .add(target[property], axis, -10, 10)
                      .name(
                        `${property.charAt(0).toUpperCase() + property.slice(1)} ${axis.toUpperCase()}`
                      )
                      .listen();
                    break;
                  }
                  case 'rotation': {
                    folder
                      .add(target[property], axis, -Math.PI, Math.PI)
                      .name(
                        `${property.charAt(0).toUpperCase() + property.slice(1)} ${axis.toUpperCase()}`
                      )
                      .listen();
                    break;
                  }
                  case 'scale': {
                    folder
                      .add(target[property], axis, 0.1, 100)
                      .name(
                        `${property.charAt(0).toUpperCase() + property.slice(1)} ${axis.toUpperCase()}`
                      )
                      .listen();
                    break;
                  }
                }
              });
            });

            if (name === 'light') {
              folder.add(target, 'intensity', 0, 1).name('Intensity').listen();

              folder.addColor(target, 'color').name('Color').listen();
            }

            folder
              .add(
                {
                  reset: () => {
                    folder.reset();
                  }
                },
                'reset'
              )
              .name('Reset');

            folder.hide();
          });


          gui
            .add(
              {
                downloadData: () => {
                  console.log(gui.save());
                  const data = JSON.stringify(gui.save(), (key, value) => {
                    if (
                      key === 'root' ||
                      key === 'parent' ||
                      key === '__controllers' ||
                      key === '__folders'
                    ) {
                      return undefined;
                    }
                    return value;
                  });
                  const blob = new Blob([data], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'vibe-400-gui.json';
                  a.click();
                  URL.revokeObjectURL(url);
                }
              },
              'downloadData'
            )
            .name('Download Data');

          gui.hide();

          window.addEventListener('keydown', (event) => {
            if (event.key === 'c') {
              camera = camera === mainCamera ? devCamera : mainCamera;
              controls.enabled = false;
              controls = controls === mainControls ? devControls : mainControls;
              controls.enabled = true;
              console.log(
                'Switching camera:',
                camera === mainCamera
                  ? 'Main Camera'
                  : 'Development CameraHelper'
              );
            }
            if (event.key === 'p') {
              console.log('trigger Panel');
              if (gui._hidden) {
                gui.show();
              } else {
                gui.hide();
              }
            }
          });
        }

        console.log('init is done');
        addEventListenerResize();
        help();
        update();
      } catch (error) {
        console.log('An error happened');
        console.log(error);
      }
    }

    function onWindowResize() {
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(
        gsap.getProperty(container.current, 'width'),
        gsap.getProperty(container.current, 'height')
      );
    }

    function loadModel(url) {
      return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(
          url,
          (gltf) => {
            const model = new THREE.Group();
            gltf.scene.position.set(0.015, -0.08, 0);
            gltf.scene.rotateY(-Math.PI);
            model.add(gltf.scene);

            resolve(model);
          }, // 當模型加載完成時，我們解析Promise
          undefined,
          (error) => reject(error) // 如果有錯誤，我們拒絕Promise
        );
      });
    }

    function update() {
      requestAnimationFrame(update);
      camera.updateProjectionMatrix();
      controls.update();
      renderer.render(scene, camera);
    }

    init();

    return { renderer: renderer, gui, removeEventListenerResize };
  };

  return (
    <div className={`${className}`}>
      <div id="three-js-container" ref={container} className="dev-red" />
    </div>
  );
}
