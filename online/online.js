
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
			
window.addEventListener( "resize", onResize );
		
function onResize( event )
{
	// shift horizontally the image
	// to comppensate for the GUI
	
	var offset = innerWidth>innerHeight ? (gui?.domElement.clientWidth??0) : 0;

	camera.setViewOffset( innerWidth+offset, innerHeight, 0, 0, innerWidth, innerHeight);
	camera.aspect = (innerWidth+offset)/innerHeight;
	camera.updateProjectionMatrix( );
	renderer.setSize( innerWidth, innerHeight );
}



var controls = new OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	//controls.autoRotate = true;
	//controls.autoRotateSpeed = 0.5;

var light = new THREE.PointLight( 'white', 4 );
	light.decay = 0;
	scene.add( light );
	
var canvas = document.createElement( 'canvas' );

var model = new THREE.Mesh(
		new THREE.SphereGeometry( 1, 64, 64 ),
//		new THREE.SphereGeometry( 1, 6, 3 ),
//		new THREE.DodecahedronGeometry( 1, 1 ),
//		new THREE.IcosahedronGeometry( 1, 10 ),
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

	var percent = model.material[map].update( );

	var now = performance.now();
	
	if( percent < 1 && now-startTime > 1000 )
	{
		model.material[map].border( canvas.width>>7 );
		model.material[map].needsUpdate = true;
		startTime = now;
	}
	
	renderer.render( scene, camera );
}





var filename,
	share,
	map,
	gui;

function installGui( info, shareFunction, mapName )
{
	filename = info.name.split(' ').join('-').toLowerCase();
	share = shareFunction;
	map = mapName;
	
	light.intensity = info.lightIntensity ?? 6;
	
	var title = `<big><em>${info.name}</em> generator</big>
			<small class="fullline">
				<a class="link" href="#" onclick="window.history.back(); return false;"><span>&#x2B9C</span>Back</a> &middot;
				<span id="share" class="link">Share<!-- &#x1F517;--></span> &middot;
				<span id="download" class="link">Download<!-- &#x2B73;--></span> &middot;
				<span id="light" class="link">Light<!-- &#x263C--></span>
			</small>`;
					  
	gui = new lil.GUI({title: title});
	gui.$title.style.marginBottom = "12em";
	gui.domElement.children[0].appendChild( canvas );

		
	document.getElementById( 'light' ).addEventListener( 'click', toggleBackground );
	document.getElementById( 'download' ).addEventListener( 'click', downloadTexture );
	document.getElementById( 'share' ).addEventListener( 'click', shareURL );

	onResize( );
	
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
	downloadLink.download = filename+'-'+(new Date().toJSON().split('-').join('').split(':').join('').split('T').join('-').split('.')[0])+'.jpg';
	downloadLink.click();

}

function shareURL( event )
{
	event.stopPropagation();
	
	var url = window.location.href.split('?')[0].split('#')[0] + '?' + share();
	
	navigator.clipboard.writeText( url );
	
	alert( `URL for this ${filename} copied to the clipboard.` );
}


// process URL options
var urlAddress = window.location.search.split('#')[0], // skip all after #
	urlParameters = new URLSearchParams( urlAddress ),
	urlOptions = {};
	
for( var [key, value] of urlParameters.entries() )
{
	urlOptions[key] = parseFloat(value);
}


onResize( );


export { model, canvas, installGui, urlOptions };