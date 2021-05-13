const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xa0a0a0 );
scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 )


const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;
camera.position.y = 0.5;


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const loader = new THREE.GLTFLoader();
var mixers = [];
var clock = new THREE.Clock();
loader.load(
	
	'./salsa.glb',
	function ( gltf ) {
        mixer = new THREE.AnimationMixer( gltf.scene );
        var action = mixer.clipAction( gltf.animations[ 0 ] );
        action.play();
        scene.add( gltf.scene );
		
	},

);
renderer.outputEncoding = THREE.sRGBEncoding;
const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add( mesh );


const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
grid.material.opacity = 0.4;
grid.material.transparent = true;
scene.add( grid );

const light = new THREE.AmbientLight( 0xffffff, 1 );
light.position.set( 80, 100, 100 );
scene.add( light );


var stats;
stats = new Stats();
stats.setMode(2); // 0: fps, 1: ms, 2memory
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "100px";
stats.domElement.style.top = "10px";
document.getElementById("myStats").appendChild(stats.domElement);


controls = new THREE.OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame( animate );
    var delta = clock.getDelta();
    if ( mixer ) mixer.update( delta );
    renderer.render( scene, camera );
    controls.update();
    stats.update();
}
animate();