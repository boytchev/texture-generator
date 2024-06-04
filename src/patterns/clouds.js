
//	Procedural Equirectangular Textures
//	Clouds Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, texture as coreTexture } from "pet/texture-generator.js";



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
		+ 0.4*noise( options.scale*x, options.scale*y, options.scale*z )
		+ 0.2*noise( 2*options.scale*x, 2*options.scale*y, 2*options.scale*z )*options.opacity
		+ 0.05*noise( 6*options.scale*x, 6*options.scale*y, -6*options.scale*z )*options.opacity*options.opacity
		+ 0.03*noise( 8*options.scale*x, -8*options.scale*y, 8*options.scale*z )*options.opacity*options.opacity;

	k = 0.5*k + 0.3*k**2 + 0.4*k**3;
	if ( k<0.3 ) k=( k/0.3 )**4*0.3;

	var n = 0.5 - 0.5*noise( options.scale*( x+0.1 ), options.scale*y, options.scale*z );
	var m = n**0.4;

	color.lerpColors( options.subcolor, options.color, m );
	color.a = Math.min( k*n, 1 )**0.75*options.opacity;

}



function options( params ) {

	var options = { };


	options.scale = 2**( ( params.scale??defaults.scale )/100 * Math.log2( 0.5/6 ) + Math.log2( 6 ) );

	options.density = -( ( params.density??defaults.density )-50 )/50;
	options.opacity = ( params.opacity??defaults.opacity )/100;

	options.color = new Color( params.color ?? defaults.color );
	options.subcolor = new Color( params.subcolor ?? defaults.subcolor );

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
