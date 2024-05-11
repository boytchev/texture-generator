
import * as THREE from "three";



// convert float[0,1] to byte[0,255]
function unitToByte( x )
{

	return Math.max( 0, Math.min( 255, 255*x ) );

} // unitToByte




// check whether power of two
function powerOfTwo( x )
{

	return Math.log2(x) % 1 == 0;

} // unitToByte




function EquiCanvas( colorizer, width=2048, height=width>>1 )
{
	if( !powerOfTwo(width) )
	{
		console.warn( `Equirectangular image width ${width} is not power of 2.` );
	}
	
	if( !powerOfTwo(height) )
	{
		console.warn( `Equirectangular image height ${height} is not power of 2.` );
	}
	
	if( 2*height != width )
	{
		console.warn( `Equirectangular image aspect ${width}:${height} is not 2:1.` );
	}
	
	var canvas = document.createElement( 'canvas' );
		canvas.width = width;
		canvas.height = height;
		
	var context = canvas.getContext( '2d' ),
		imageData = context.getImageData( 0, 0, width, height ),
		data = imageData.data,
		index = 0,
		color = new THREE.Color(),
		vector = new THREE.Vector3();

	for( var y=0; y<height; y++)
	for( var x=0; x<width; x++)
	{
		var alpha = 2*Math.PI * x/width,
			beta = Math.PI * y/height;
			
		vector.setFromSphericalCoords( 1, beta, alpha );

		colorizer( vector.x, vector.y, vector.z, color, x/width, y/height );
		
		data[index++] = unitToByte( color.r );
		data[index++] = unitToByte( color.g );
		data[index++] = unitToByte( color.b );
		data[index++] = 255;
	}
	
	context.putImageData( imageData, 0, 0 );
	
	return canvas;
	
} // EquiCanvas



function EquiTexture( colorizer, width=2048, height=width>>1 )
{
	var canvas = EquiCanvas( colorizer, width, height );
	
	var texture = new THREE.CanvasTexture( canvas )
		texture.minFilter = THREE.LinearFilter; // MIPMAP filters create a seam and destroy the poles

	return texture;
	
} // EquiTexture



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
	
function EquiMaterial( material )
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
	
} // EquiMaterial



export { EquiCanvas, EquiTexture, EquiMaterial };