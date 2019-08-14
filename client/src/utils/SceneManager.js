
import * as THREE from "three"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

const ambientLight = new THREE.AmbientLight(0xcccccc);
const directionalLight = new THREE.DirectionalLight( 0x666666, 2 );
      directionalLight.position.set(1, 1, 0.5).normalize();



// Manage animations in here
const SceneManager = {
    init: (width, height) => {
        renderer.setSize(width, height)
        renderer.setPixelRatio(window.devicePixelRatio)

        camera.aspect = width/height;
        camera.position.z = 5;

        scene.background = new THREE.Color(0x0B212B)
        scene.add(ambientLight)
        scene.add(directionalLight)
    },
    add: (obj) => {
        scene.add(obj)
    },
    getCamera: () => {
        return camera;
    },
    // Try to avoid using this directly to much
    getScene: () => {
        return scene
    },
    getDomElement: () => {
        return renderer.domElement
    },
    render: () => {
        renderer.render(scene, camera)
    }
};

export default SceneManager;
