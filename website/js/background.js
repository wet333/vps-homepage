import { MousePosition } from "./MousePosition.js";
import { randomColorWithProbability } from "./getRandomColors.js";

// Create a scene
var scene = new THREE.Scene();
var mousePos = new MousePosition();

// Create a camera
var camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);
camera.position.z = 100; // Update the camera position

// Create a renderer
var renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById("background"),
	antialias: true,
});
resizeRenderer();
window.addEventListener("resize", resizeRenderer);

// Create a starfield
const starGeometry = new THREE.BufferGeometry();

const starMaterial = new THREE.ShaderMaterial({
	uniforms: THREE.UniformsUtils.merge([
		THREE.UniformsLib.points,
		THREE.UniformsLib.diffuse,
		{ minSize: { value: 1.6 }, maxSize: { value: 6.8 } },
	]),
	vertexShader: `
        uniform float size;
        uniform float minSize;
        uniform float maxSize;
        varying vec3 vColor;

        void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float pointSize = size * (500.0 / -mvPosition.z);

            gl_PointSize = clamp(pointSize, minSize, maxSize);
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
	fragmentShader: `
        uniform vec3 diffuse;
        varying vec3 vColor;
        void main() {
            float r = 0.0, delta = 0.0, alpha = 1.0;
            vec2 cxy = 2.0 * gl_PointCoord - 1.0;
            r = dot(cxy, cxy);
            if (r > 1.0) {
                discard;
            }
            gl_FragColor = vec4(diffuse * vColor, alpha * (1.0 - r));
        }
    `,
	transparent: true,
	vertexColors: true,
});

const starPositions = [];
const starColors = [];

for (let i = 0; i < 10000; i++) {
	const x = THREE.MathUtils.randFloatSpread(1000);
	const y = THREE.MathUtils.randFloatSpread(1000);
	const z = THREE.MathUtils.randFloatSpread(1000);

	starPositions.push(x, y, z);
	starColors.push(...randomColorWithProbability());
}

starGeometry.setAttribute(
	"position",
	new THREE.Float32BufferAttribute(starPositions, 3),
);
starGeometry.setAttribute(
	"color",
	new THREE.Float32BufferAttribute(starColors, 3),
);

const starField = new THREE.Points(starGeometry, starMaterial);
scene.add(starField);

// Add some lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Set the camera position
camera.position.z = 5;

// Render loop
function animate() {
	requestAnimationFrame(animate);
	starField.rotation.x += (mousePos.y - window.innerHeight / 2) / 1000000;
	starField.rotation.y += (mousePos.x - window.innerWidth / 2) / 1000000;
	renderer.render(scene, camera);
}
animate();

function resizeRenderer() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
}
