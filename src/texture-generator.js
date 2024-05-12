
//
//


import { Color, Vector3, CanvasTexture, LinearFilter } from "three";



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

	return texture;
	
} // equitexture




const
	VERTEX_FROM = `void main() {`,
	VERTEX_TO = `
		varying vec3 vEquiNoise_Position;

		void main() {

			vEquiNoise_Position = vec3(position);
		`,
	FRAGMENT_FROM = `void main() {`,
	FRAGMENT_TO = `
		varying vec3 vEquiNoise_Position;

		void main() {
		`,
	FRAGMENT_MAP_FROM = `#include <map_fragment>`,
	FRAGMENT_MAP_TO = `
		#ifdef USE_MAP
		  vec2 EquiNoise_uv = equirectUv(normalize(vEquiNoise_Position.xyz));
		  diffuseColor *= texture2D(map,EquiNoise_uv);
		#endif
		`;
	
function equimaterial( material )
{

	if( material.map )
	{
		material.onBeforeCompile = function( shader )
		{
			shader.vertexShader = shader.vertexShader.replace( VERTEX_FROM, VERTEX_TO );
			shader.fragmentShader = shader.fragmentShader.replace( FRAGMENT_FROM, FRAGMENT_TO );
			if( material.map )
			{
				shader.fragmentShader = shader.fragmentShader.replace( FRAGMENT_MAP_FROM, FRAGMENT_MAP_TO );
			}
		}
	}			

	return material;
	
} // equimaterial



export { equimaterial, equicanvas, equitexture };