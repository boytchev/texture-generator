
//	Procedural Equirectangular Textures
//	Camouflage Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, retexture, map, mapExp } from "../texture-generator.js";



var defaults = {
	$name: 'Camouflage',

	width: 512,
	height: 256,

	scale: 50,

	colorA: 0xc2bea8,
	colorB: 0x9c895e,
	colorC: 0x92a375,
	colorD: 0x717561,

	hue: 0,
	saturation: 0,
	brightness: 0,
};



function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	x *= options.scale;
	y *= options.scale;
	z *= options.scale;

	if ( Math.round( noise( x, y, z )+0.2 ) >= 1 )
		color.copy( options.colorA );
	else
		if ( Math.round( noise( y, z, x )+0.3 ) >= 1 )
			color.copy( options.colorB );
		else
			if ( Math.round( noise( z, x, y )+0.4 ) >= 1 )
				color.copy( options.colorC );
			else
				color.copy( options.colorD );

	color.offsetHSL( options.hue, options.saturation, options.brightness );

}



function options( params ) {

	return {
		colorA: new Color( params.colorA ?? defaults.colorA ),
		colorB: new Color( params.colorB ?? defaults.colorB ),
		colorC: new Color( params.colorC ?? defaults.colorC ),
		colorD: new Color( params.colorD ?? defaults.colorD ),

		scale: mapExp( params.scale ?? defaults.scale, 32, 0.5 ),
		hue: map( params.hue ?? defaults.hue, -1, 1, -360, 360 ),
		saturation: map( params.saturation ?? defaults.saturation ),
		brightness: map( params.brightness ?? defaults.brightness ),

		width: params.width ?? defaults.width,
		height: params.height ?? defaults.height,
	};

}




function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "../texture-generator.js";
