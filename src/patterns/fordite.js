
//	Procedural Equirectangular Textures
//	Fordite Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, texture as coreTexture } from "pet/texture-generator.js";



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

	color.r += options.color.r;
	color.g += options.color.g;
	color.b += options.color.b;

}



function options( params ) {

	var options = { };

	options.scale = 2**( ( params.scale??defaults.scale )/100 * Math.log2( 0.5/2.5 ) + Math.log2( 2.5 ) );

	options.color = new Color( params.color ??defaults.color );

	options.width = params.width ??defaults.width;
	options.height = params.height ??defaults.height;

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
