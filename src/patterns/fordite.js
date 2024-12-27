
//	Procedural Equirectangular Textures
//	Fordite Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, retexture, mapExp } from "../texture-generator.js";



var defaults = {
	$name: 'Fordite',

	width: 1024,
	height: 512,

	scale: 50,

	color: 0x000000,
};



function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var k = noise( noise( x, y, z ), 2*noise( x, y, z ), 3*noise( x, y, z ), options.scale );

	color.setHSL( 0.5*k+0.3, 1, 0.5+0.5*Math.sin( 4*Math.PI*k ) );
	color.add( options.color );

}



function options( params ) {

	return {

		scale: mapExp( params.scale ?? defaults.scale, 2.5, 0.5 ),

		color: new Color( params.color ?? defaults.color ),

		width: params.width ?? defaults.width,
		height: params.height ?? defaults.height,
	};

}



function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "../texture-generator.js";
