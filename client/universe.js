let skybox
let skyboxMesh
class Universe {
    constructor() {
        let sunHemi = new THREE.HemisphereLight(0xaaaaaa, 10);
        let sunDirectional = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        scene.add(sunHemi);
        scene.add(sunDirectional);

        skybox = new THREE.Scene();
        let loader = new THREE.TextureLoader();
        let skyboxTexture = loader.load(
            '/assets/space.png',
        );
        skyboxTexture.magFilter = THREE.LinearFilter;
        skyboxTexture.minFilter = THREE.LinearFilter;

        let shader = THREE.ShaderLib.equirect;
        let skyboxMat = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.BackSide,
        });
        skyboxMat.uniforms.tEquirect.value = skyboxTexture;
        let plane = new THREE.BoxBufferGeometry(2, 2, 2);
        skyboxMesh = new THREE.Mesh(plane, skyboxMat);
        skybox.add(skyboxMesh);

        // Adds in game colored axis to help with directions
        let axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);
    }
    updateSkybox(position){
        skyboxMesh.position.copy(position);
    }
    render() {
        renderer.render(skybox, camera);
    }
}