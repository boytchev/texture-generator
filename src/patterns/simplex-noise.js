
//	Procedural Equirectangular Textures
//	Simplex Noise Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, retexture, map, mapExp } from "pet/texture-generator.js";



var defaults = {
	$name: 'Simplex noise',

	width: 512,
	height: 256,

	scale: 50,

	balance: 50,

	color: 0xFFFFFF,
	background: 0x000000,
};



function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var k = 0.5 - 0.5*noise( x, y, z, options.scale );

	color.lerpColors( options.color, options.background, k**options.balance );

}



function options( params ) {

	return {
		scale: mapExp( params.scale ?? defaults.scale, 32, 0.5 ),
		balance: mapExp( params.balance ?? defaults.balance, 0.007, 150),
		
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
