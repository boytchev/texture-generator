
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

var startTime = 0;


function animationLoop( t )
{
	controls.update( );
	light.position.copy( camera.position );

	var percent = model.material.map.update( );
	var now = performance.now();
	
	if( percent < 1 && now-startTime > 1000 )
	{
		model.material.map.border( canvas.width>>7 );
		model.material.map.needsUpdate = true;
		startTime = now;
	}
	
	renderer.render( scene, camera );
}





var filename;

function installGui( title )
{
	filename = title;
	
	title = `<big><em>${title}</em> generator</big>
			<small>
				<a id="download" href="#">Download</a> &middot;
				<a id="light" href="#">Light</a> &middot;
				<a href="./">Home</a>
			</small>`;
					  
	var gui = new lil.GUI({title: title});
		gui.$title.style.marginBottom = "12em";
		gui.domElement.children[0].appendChild( canvas );

		
	document.getElementById( 'light' ).addEventListener( 'click', toggleBackground );
	document.getElementById( 'download' ).addEventListener( 'click', downloadTexture );

	return gui.addFolder( '<big>Options</big>' );
}


var lightBackground = true;

function toggleBackground( event )
{
	event.stopPropagation();
	
	lightBackground = !lightBackground;
	
	scene.background.setStyle( lightBackground ? 'white' : 'black' );
}


var downloadLink = document.createElement('a');

function downloadTexture( event )
{
	event.stopPropagation();
	
	downloadLink.href = canvas.toDataURL( 'image/jpeg', 1.0 );
	downloadLink.download = filename+' '+(new Date().toJSON().split('-').join('').split(':').join('').split('T').join('-').split('.')[0])+'.jpg';
	downloadLink.click();

}


export { model, canvas, installGui };