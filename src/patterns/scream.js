
//	Procedural Equirectangular Textures
//	Scream Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, texture as coreTexture } from "pet/texture-generator.js";



var defaults = {
	$name: 'Scream',

	width: 1024,
	height: 512,

	scale: 60,

	color: 0xF0F060,
	background: 0xD09090,
};



function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var scale = options.scale;

	var xx = Math.sin( scale*x )+Math.cos( scale*y ),
		yy = Math.sin( scale*y )+Math.cos( scale*z ),
		zz = Math.sin( scale*z )+Math.cos( scale*x );

	var k = noise( xx, yy, zz );

	scale = scale*k;

	xx = Math.sin( scale*x )+Math.cos( scale*y );
	yy = Math.sin( scale*y )+Math.cos( scale*z );
	zz = Math.sin( scale*z )+Math.cos( scale*x );

	k = 2*noise( xx, yy, zz );

	color.lerpColors( options.background, options.color, k );

	color.offsetHSL( Math.cos( k-0.5 ), 0, 0.25 );

}



function options( params ) {

	var options = { };

	options.scale = 2**( ( params.scale??defaults.scale )/100 * Math.log2( 2.5/15 ) + Math.log2( 15 ) );

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
