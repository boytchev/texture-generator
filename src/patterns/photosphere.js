
//	Procedural Equirectangular Textures
//	Photosphere Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color, Vector3, Euler } from "three";
import { noise, texture as coreTexture } from "pet/texture-generator.js";



var defaults = {
	$name: 'Photosphere',

	width: 1024,
	height: 512,

	scale: 30,

	color: 0xFFFF00,
	background: 0xFF0000,
};



var vec = new Vector3( 1, 0, 1 );
var eu = new Euler();

function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var scale = options.scale;
	vec.set( x, y, z );

	for ( var i=0; i<5; i++ ) {

		eu.set( scale*x, scale*y, scale*z );
		vec.applyEuler( eu );
		scale=scale*1.1;

	}

	var k = ( 1+noise( vec.x, vec.y, vec.z ) )/2;

	color.lerpColors( options.background, options.color, k );

}



function options( params ) {

	var options = { };

	options.scale = 2**( ( params.scale??defaults.scale )/100 * Math.log2( 3/80 ) + Math.log2( 80 ) );

	options.color = new Color( params.color ??defaults.color );
	options.background = new Color( params.background ??defaults.background );

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
