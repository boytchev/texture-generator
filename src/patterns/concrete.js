
//	Procedural Equirectangular Textures
//	Concrete Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { noise, retexture, map, mapExp } from "pet/texture-generator.js";



var defaults = {
	$name: 'Concrete',

	width: 512,
	height: 256,

	scale: 50,
	density: 100,
	bump: 100,
};



function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var k = noise( x, y, z, options.scale );

	color.setHSL( 0, 0, options.bump*( 0.5+0.5*k )**options.density );

}



function options( params ) {

	return {

		scale: mapExp( params.scale ?? defaults.scale, 90, 5.5 ),
		density: mapExp(params.density ?? defaults.density, 10, 0.5),
		bump: map( params.bump??defaults.bump ),

		width: params.width ?? defaults.width,
		height: params.height ?? defaults.height,

	};

}



function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";
