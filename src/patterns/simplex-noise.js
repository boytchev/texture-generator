
//	Procedural Equirectangular Textures
//	Simplex Noise Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, texture as coreTexture } from "pet/texture-generator.js";



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

	var options = { };

	options.scale = 2**( -( ( params.scale??defaults.scale )-100 )/50 * 3 - 1 );
	options.balance = Math.exp( ( ( params.balance??defaults.balance )-50 )/10 );
	options.color = new Color( params.color ?? defaults.color );
	options.background = new Color( params.background ?? defaults.background );

	options.width = params.width ?? defaults.width;
	options.height = params.height ?? defaults.height;

	return options;

}



function texture( ...opt ) {

	if ( opt.length==0 ) opt = [ defaults ];

	// if there is {...}, assume it is user options, compile them
	var params = opt.map( ( e ) => ( e!=-null ) && ( typeof e =='object' ) && !( e instanceof HTMLCanvasElement ) ? options( e ) : e );

	// if pattern is missing, add pattern
	if ( params.findIndex( ( e )=>e instanceof Function ) == -1 ) {

		params.push( pattern );

	}

	return coreTexture( ... params );

}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";
