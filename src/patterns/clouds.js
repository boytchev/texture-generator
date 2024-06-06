
//	Procedural Equirectangular Textures
//	Clouds Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, retexture, map, mapExp } from "pet/texture-generator.js";



var defaults = {
	$name: 'Clouds',

	width: 512,
	height: 256,

	scale: 50,
	density: 50,
	opacity: 80,

	color: 0xFFFFFF,
	subcolor: 0xA0A0B0,
};



function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var k = -0.7 + options.density
		+ 0.4*noise( x, y, z, options.scale )
		+ 0.2*noise( x, y, z, 2*options.scale )*options.opacity
		+ 0.05*noise( x, y, -z, 6*options.scale )*options.opacity*options.opacity
		+ 0.03*noise( x, -y, z, 8*options.scale )*options.opacity*options.opacity;

	k = 0.5*k + 0.3*k**2 + 0.4*k**3;
	if ( k<0.3 ) k=( k/0.3 )**4*0.3;

	var n = 0.5 - 0.5*noise( x+0.1, y, z, options.scale );
	var m = n**0.4;

	color.lerpColors( options.subcolor, options.color, m );
	color.a = Math.min( k*n, 1 )**0.75*options.opacity;

}



function options( params ) {

	return {

		scale: mapExp( params.scale ?? defaults.scale, 6, 0.5 ),

		density: map( params.density ?? defaults.density, 1, -1 ),
		opacity: map( params.opacity ?? defaults.opacity ),

		color: new Color( params.color ?? defaults.color ),
		subcolor: new Color( params.subcolor ?? defaults.subcolor ),

		width: params.width ?? defaults.width,
		height: params.height ?? defaults.height,

	};

}



function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";
