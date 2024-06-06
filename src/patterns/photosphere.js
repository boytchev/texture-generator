
//	Procedural Equirectangular Textures
//	Photosphere Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color, Vector3, Euler } from "three";
import { noise, retexture, map, mapExp } from "pet/texture-generator.js";



var defaults = {
	$name: 'Photosphere',

	width: 1024,
	height: 512,

	scale: 30,

	color: 0xFFFF00,
	background: 0xFF0000,
};



var vec = new Vector3( 1, 0, 1 );
var eu = new Euler();

function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var scale = options.scale;
	vec.set( x, y, z );

	for ( var i=0; i<5; i++ ) {

		eu.set( scale*x, scale*y, scale*z );
		vec.applyEuler( eu );
		scale=scale*1.1;

	}

	var k = ( 1+noise( vec.x, vec.y, vec.z ) )/2;

	color.lerpColors( options.background, options.color, k );

}



function options( params ) {

	return {

		scale: mapExp( params.scale ?? defaults.scale, 80, 3),

		color: new Color( params.color ?? defaults.color ),
		background: new Color( params.background ?? defaults.background ),

		width: params.width ?? defaults.width,
		height: params.height ?? defaults.height,

	};

}



function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";
