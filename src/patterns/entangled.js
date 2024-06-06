
//	Procedural Equirectangular Textures
//	Entangled Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, retexture, mapExp } from "pet/texture-generator.js";



var defaults = {
	$name: 'Entangled',

	width: 1024,
	height: 512,

	scale: 50,
	density: 10,

	color: 0x002040,
	background: 0xFFFFFF,
};



function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var k = -Infinity;
	var scale = options.scale;

	for ( var i=0; i<options.density; i++ ) {

		var k1 = noise( x, y, z, scale );
		k1 = Math.sin( 3*Math.PI*k1 );

		k = Math.max( k, k1 );

		scale *= 1.2;

	}

	k = 1-k**5;
	k = k*6;

	color.lerpColors( options.color, options.background, k );

}



function options( params ) {

	return {

		scale: mapExp( params.scale ?? defaults.scale, 5.6, 0.5 ),
		density: 1 + ( params.density??defaults.density ),

		color: new Color( params.color ??defaults.color ),
		background: new Color( params.background ??defaults.background ),

		width: params.width ??defaults.width,
		height: params.height ??defaults.height,

	};

}



function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";
