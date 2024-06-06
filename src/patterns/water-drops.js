
//	Procedural Equirectangular Textures
//	Water Drops Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, retexture, map, mapExp } from "pet/texture-generator.js";



var defaults = {
	$name: 'Water Drops',

	width: 512,
	height: 256,

	scale: 50,
	density: 40,

	color: 0xFFFFFF,
	background: 0x000000,
};



function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var k = noise( x, y, z, options.scale ) + options.density;
	k = Math.min( 1, k );
	k = Math.max( 0, k )**0.5;

	k = -( Math.cos( Math.PI*k )-1 )/2;

	color.lerpColors( options.background, options.color, k );

}



function options( params ) {

	return {

		color: new Color( params.color ?? defaults.color ),
		background: new Color( params.background ?? defaults.background ),

		scale: mapExp( params.scale ?? defaults.scale, 90, 1.5 ),
		density: map( params.density??defaults.density, -0.6, 0.6 ),

		width: params.width ?? defaults.width,
		height: params.height ?? defaults.height,

	};

}



function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";
