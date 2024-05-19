
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as lil from "three/addons/libs/lil-gui.module.min.js";

		
// setting up the scene

var scene = new THREE.Scene();
	scene.background = new THREE.Color( 'white' );
		
var camera = new THREE.PerspectiveCamera( 5, innerWidth/innerHeight );
	camera.position.set( 0, 0, 30 );
	camera.lookAt( scene.position );

var renderer = new THREE.WebGLRenderer( {antialias: true} );
	renderer.setSize( innerWidth, innerHeight );
	renderer.setAnimationLoop( animationLoop );
	renderer.toneMapping = THREE.LinearToneMapping;
	document.body.appendChild( renderer.domElement );
			
window.addEventListener( "resize", (event) => {
	camera.aspect = innerWidth/innerHeight;
	camera.updateProjectionMatrix( );
	renderer.setSize( innerWidth, innerHeight );
});
		
var controls = new OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	//controls.autoRotate = true;
	//controls.autoRotateSpeed = 0.5;

var light = new THREE.PointLight( 'white', 3.14 );
	light.decay = 0;
	scene.add( light );
	
var canvas = document.createElement( 'canvas' );

var model = new THREE.Mesh(
		new THREE.SphereGeometry( 1, 64, 32 ),
		new THREE.MeshLambertMaterial( )
	);

scene.add( model );

var canvas = document.createElement( 'canvas' );
	canvas.style = "width:100%;";

var customLoop;

function animationLoop( t )
{
	controls.update( );
	light.position.copy( camera.position );
	if( customLoop ) customLoop( t );
	renderer.render( scene, camera );
}


class HexahedronGeometry extends THREE.PolyhedronGeometry
{
	constructor( radius, level )
	{
		var verticesOfCube = [
			-1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
			-1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
		];

		var indicesOfFaces = [
			2,1,0,    0,3,2,
			0,4,7,    7,3,0,
			0,1,5,    5,4,0,
			1,2,6,    6,5,1,
			2,3,7,    7,6,2,
			4,5,6,    6,7,4
		];

		super( verticesOfCube, indicesOfFaces, radius, level );
	}
}


function installGui( title, loop )
{
	title = `<big><em>${title}</em> generator</big>
			<small>
				<!--a href="..">Download</a> &middot;-->
				<a id="light" href="#">Light</a> &middot;
				<a href="./">Home</a>
			</small>`;
					  
	var gui = new lil.GUI({title: title});
		gui.$title.style.marginBottom = "12em";
		gui.domElement.children[0].appendChild( canvas );

	customLoop = loop;
		
		
	document.getElementById( 'light' ).addEventListener( 'click', toggleBackground );

	return gui;
}


var lightBackground = true;

function toggleBackground( event )
{
	event.stopPropagation();
	
	lightBackground = !lightBackground;
	
	scene.background.setStyle( lightBackground ? 'white' : 'black' );
}

export { model, canvas, HexahedronGeometry, installGui };