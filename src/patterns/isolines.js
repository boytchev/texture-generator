
//	Procedural Equirectangular Textures
//	Isolines Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color, MathUtils } from "three";
import { noise, retexture, map, mapExp } from "pet/texture-generator.js";



var defaults = {
	$name: 'Isolines',

	width: 1024,
	height: 512,

	scale: 50,
	density: 20,
	blur: 10,
	balance: 50,

	color: 0xFFFFFF,
	background: 0x000000,
};



function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var k = noise( x, y, z, options.scale );

	k = 0.5 - 0.5*Math.sin( options.density*k );

	k = MathUtils.smoothstep( k, options.minSmooth, options.maxSmooth );

	color.lerpColors( options.color, options.background, k );

}



function options( params ) {

	var blur = map( params.blur ?? defaults.blur ),
		balance = map( params.balance ?? defaults.balance );

	return {

		scale: mapExp( params.scale ?? defaults.scale, 32, 0.5 ),
		density: map( params.density ?? defaults.density, 10, 60 ),

		minSmooth: balance - blur - 0.01,
		maxSmooth: balance + blur + 0.01,

		color: new Color( params.color ??defaults.color ),
		background: new Color( params.background ??defaults.background ),

		width: params.width ?? defaults.width,
		height: params.height ?? defaults.height,

	};

}



function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";
