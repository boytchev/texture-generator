
//	Procedural Equirectangular Textures
//	Zebra Lines Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Vector3 } from "three";
import { retexture, map } from "pet/texture-generator.js";



var defaults = {
	$name: 'Zebra lines',

	width: 512,
	height: 256,

	scale: 60,
	angle: 0,
};



var vec = new Vector3( );

function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	vec.set( x, y, z );

	var a = vec.angleTo( options.up ),
		sin = Math.sin( options.scale*a );

	var k = map( sin, 0, 1, -options.scale/500, options.scale/500 );

	color.setHSL( 0, 0, k );

}



function options( params ) {

	var angle = ( params.angle ?? defaults.angle )*Math.PI/180;

	return {
		scale: map( params.scale ?? defaults.scale, 151, 2 ),

		up: new Vector3( 0,
			1e-6*Math.round( 1e6*Math.cos( angle ) ),
			1e-6*Math.round( 1e6*Math.sin( angle ) ) ),

		width: params.width ?? defaults.width,
		height: params.height ?? defaults.height,
	};

}



function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";
