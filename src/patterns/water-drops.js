
//	Procedural Equirectangular Textures
//	Water Drops Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, texture as coreTexture } from "pet/texture-generator.js";



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

	var options = { };

	options.color = new Color( params.color ?? defaults.color );
	options.background = new Color( params.background ?? defaults.background );

	options.scale = 2**( 6.5-6*( params.scale??defaults.scale )/100 );
	options.density = ( ( params.density??defaults.density )-50 )/100+0.1;

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
