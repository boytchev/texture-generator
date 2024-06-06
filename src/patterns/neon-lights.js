
//	Procedural Equirectangular Textures
//	Neon Lights Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, retexture, mapExp } from "pet/texture-generator.js";



var defaults = {
	$name: 'Neon Lights',

	width: 1024,
	height: 512,

	scale: 50,
	mode: 0, // 0=additive, 1=subtractive

	colorA: 0xFF0000,
	colorB: 0x00FF00,
	colorC: 0x0000FF,
	background: 0x000000,
};



var neon = new Color();
var hsl = { h: 0, s: 0, l: 0 };

function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	color.copy( options.background );

	var k;

	// color A
	k = noise( noise( x, y, z ), noise( y, z, x ), noise( z, x, y ), options.scale );
	k = ( 1-Math.abs( k )**1/2 )**10;

	neon.copy( options.colorA );
	neon.getHSL( hsl );
	neon.setHSL( hsl.h, hsl.s, hsl.l*k );
	switch ( options.mode ) {

		case 0: color.add( neon ); break;
		case 1: color.sub( neon ); break;

	}

	k = noise( noise( -x, y, z ), noise( y, -z, x ), noise( z, x, -y ), options.scale );
	k = ( 1-Math.abs( k )**1/2 )**10;

	neon.copy( options.colorB );
	neon.getHSL( hsl );
	neon.setHSL( hsl.h, hsl.s, hsl.l*k );
	switch ( options.mode ) {

		case 0: color.add( neon ); break;
		case 1: color.sub( neon ); break;

	}

	k = noise( noise( x, -y, z ), noise( y, z, -x ), noise( -z, x, y ), options.scale );
	k = ( 1-Math.abs( k )**1/2 )**10;

	neon.copy( options.colorC );
	neon.getHSL( hsl );
	neon.setHSL( hsl.h, hsl.s, hsl.l*k );
	switch ( options.mode ) {

		case 0: color.add( neon ); break;
		case 1: color.sub( neon ); break;

	}

}


function options( params ) {

	return {
		colorA: new Color( params.colorA ?? defaults.colorA ),
		colorB: new Color( params.colorB ?? defaults.colorB ),
		colorC: new Color( params.colorC ?? defaults.colorC ),
		background: new Color( params.background ?? defaults.background ),

		scale: mapExp( params.scale ?? defaults.scale, 2, 0.1 ),
		mode: params.mode ?? defaults.mode,

		width: params.width ?? defaults.width,
		height: params.height ?? defaults.height,
	};

}




function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";
