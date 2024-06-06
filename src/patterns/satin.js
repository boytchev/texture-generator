
//	Procedural Equirectangular Textures
//	Satin Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, retexture, mapExp } from "pet/texture-generator.js";



var defaults = {
	$name: 'Satin',

	width: 512,
	height: 256,

	scale: 50,

	color: 0x7080FF,
	background: 0x000050,
};



function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var k = noise(
		noise( 2*x, y, z, options.scale ),
		noise( x, 2*y, z, options.scale ),
		noise( x, y, 2*z, options.scale ),
	);

	k = Math.abs( k )**3;

	color.lerpColors( options.background, options.color, k );

}



function options( params ) {

	return {

		scale: mapExp( params.scale ?? defaults.scale, 2.5, 0.25 ),

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
