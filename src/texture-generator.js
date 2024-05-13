
//
//


import { Color, Vector3, CanvasTexture, LinearFilter, EquirectangularReflectionMapping, MathUtils } from "three";
import { SimplexNoise } from "three/addons/math/SimplexNoise.js";


var PRNG = { random: function(x){return MathUtils.seededRandom(x);} };

var simplex = new SimplexNoise( PRNG );
	
function noise( x, y, z )
{
	return simplex.noise3d( x, y, z );
}

function noiseSeed( x )
{
	PRNG.random( x );
	simplex = new SimplexNoise( PRNG );
}

function noiseRandomize( )
{
	PRNG.random( new Date().getTime() );
	simplex = new SimplexNoise( PRNG );
}

noiseRandomize();


function unitToByte( x )
{

	return Math.max( 0, Math.min( 255, Math.round(255*x) ) );

} // unitToByte



function equicanvas( ...args ) // number, canvas, function
{
	var width, height, canvas, smooth, noise;

	// processing input parameters

	for( var param of args )
	{
		if( param instanceof HTMLCanvasElement )
			canvas = param;
		else
		if( param instanceof Function )
			noise = param;
		else
		if( Number.isFinite(param) )
		{
			width = param;
			height = Math.round(param/2);
		}
		else
			console.warn( `Ignored parameter '${param}'. The parameters of generate(...) are a number, a canvas and a function (in any order).` );
	}
	
	if( !canvas && !Number.isFinite(width) )
	{
		width = 1024;
		height = 512;
	}

	if( !canvas )
	{
		canvas = document.createElement( 'canvas' );
	}
	
	if( Number.isFinite(width) )
	{
		canvas.width = width;
		canvas.height = height;
	}
	
	width = canvas.width;
	height = canvas.height;


	// generating texture
	
	var context = canvas.getContext( '2d' ),
		imageData = context.getImageData( 0, 0, width, height ),
		data = imageData.data,
		index = 0,
		color = new Color(),
		vector = new Vector3();

	for( var y=0; y<height; y++)
	for( var x=0; x<width; x++)
	{
		var u = x / width,
			v = y / height;
			
		vector.setFromSphericalCoords( 1, Math.PI*v, 2*Math.PI*u );
		noise( vector.x, vector.y, vector.z, color, u, v );

		data[index++] = unitToByte( color.r );
		data[index++] = unitToByte( color.g );
		data[index++] = unitToByte( color.b );
		data[index++] = unitToByte( color?.a ?? 255 );
	}
	
	context.putImageData( imageData, 0, 0 );

	return canvas;
	
} // equicanvas



function equitexture( ...args )
{
	var texture = new CanvasTexture( equicanvas(...args) );

	texture.minFilter = LinearFilter; // MIPMAP filters create a seam and destroy the poles
	texture.mapping = EquirectangularReflectionMapping; 

	return texture;
	
} // equitexture




const // general patch for vertex shader
	VERTEX_FROM = `void main() {`,
	VERTEX_TO = `
		varying vec3 vEquiNoise_Position;

		void main() {

			vEquiNoise_Position = vec3(position);
		`;
		
const // general patch for fragment shader
	FRAGMENT_FROM = `uniform vec3 diffuse;`,
	FRAGMENT_TO = `
		varying vec3 vEquiNoise_Position;

		uniform vec3 diffuse;
		`;
		
const // specific patch for map in fragment shader
	FRAGMENT_MAP_FROM = `#include <map_fragment>`,
	FRAGMENT_MAP_TO = `
		#ifdef USE_MAP
		  vec2 EquiNoise_uv = equirectUv(normalize(vEquiNoise_Position.xyz));
		  diffuseColor *= texture2D(map,EquiNoise_uv);
		#endif
		`;
		
const // specific patch for bumpMap in fragment shader
	FRAGMENT_BUMPMAP_FROM = `#include <bumpmap_pars_fragment>`,
	FRAGMENT_BUMPMAP_TO = `
		#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;

	// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
	// https://mmikk.github.io/papers3d/mm_sfgrad_bump.pdf

	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

	vec2 dHdxy_fwd() {
		vec2 EquiNoise_BumpMapUv = equirectUv(normalize(vEquiNoise_Position.xyz));

		vec2 dSTdx = dFdx( EquiNoise_BumpMapUv );
		vec2 dSTdy = dFdy( EquiNoise_BumpMapUv );

		float Hll = bumpScale * texture2D( bumpMap, EquiNoise_BumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, EquiNoise_BumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, EquiNoise_BumpMapUv + dSTdy ).x - Hll;

		return vec2( dBx, dBy );

	}

	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

		// normalize is done to ensure that the bump map looks the same regardless of the texture's scale
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm; // normalized

		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );

		float fDet = dot( vSigmaX, R1 ) * faceDirection;

		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );

	}

		#endif
		`;
	
function equimaterial( material )
{
	function shouldPatch( map, mapName )
	{
		// there is no map
		if( !map ) return false;
		
		// the map is not equirectangular
		if( map.mapping != EquirectangularReflectionMapping ) return false;
		
		// the map has no name, so do not check it
		if( !mapName ) return true;

		// warn if the map has a modified repeat, offset, center or radius
		if( (map.repeat.x != 1) || (map.repeat.y != 1) )
		{
			console.warn( `The equirectangular texture in ${mapName} has a non-unit repeat=(${map.repeat.x},${map.repeat.y}). This is unusual.` );
		}
			
		if( (map.offset.x != 0) || (map.offset.y != 0) )
		{
			console.warn( `The equirectangular texture in ${mapName} has a non-zero offset=(${map.offset.x},${map.offset.y}). This is unusual.` );
		}
			
		if( (map.center.x != 0) || (map.center.y != 0) )
		{
			console.warn( `The equirectangular texture in ${mapName} has a non-zero center=(${map.center.x},${map.center.y}). This is unusual.` );
		}
			
		if( MathUtils.euclideanModulo(map.rotation, 2*Math.PI) > 1E-6 )
		{
			console.warn( `The equirectangular texture in ${mapName} has a non-zero rotation=${map.rotation}. This is unusual.` );
		}
		
		return true;
		
	} // equimaterial.shoukdPatch
	
	if( shouldPatch(material.map,'map') || shouldPatch(material.bumpMap,'bumpMap') )
	{
		material.onBeforeCompile = function( shader )
		{
			// general patches for any kind of map -- add a varying variable
			// containing position used for equrectangular textures
			shader.vertexShader = shader.vertexShader.replace( VERTEX_FROM, VERTEX_TO );
			shader.fragmentShader = shader.fragmentShader.replace( FRAGMENT_FROM, FRAGMENT_TO );
			
			// patch map in fragment shader
			if( shouldPatch(material.map) )
			{
				shader.fragmentShader = shader.fragmentShader.replace( FRAGMENT_MAP_FROM, FRAGMENT_MAP_TO );
			} else
			
			// patch bumpMap in fragment shader
			if( shouldPatch(material.bumpMap) )
			{
				shader.fragmentShader = shader.fragmentShader.replace( FRAGMENT_BUMPMAP_FROM, FRAGMENT_BUMPMAP_TO );
			}
		}
	}			

	return material;
	
} // equimaterial



/*
  var blob = new Blob([`
  self.onmessage = function(e) {
    self.postMessage('msg from worker');
  };
`], { type: "text/javascript" })

  var worker = new Worker(window.URL.createObjectURL(blob));
  worker.onmessage = function(e) {
    console.log("Received: " + e.data);
  }
  worker.postMessage("hello"); // Start the worker.
*/


export { equimaterial, equicanvas, equitexture, noise, noiseSeed, noiseRandomize };