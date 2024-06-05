
//	Procedural Equirectangular Textures
//	Scepter Head Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, texture as coreTexture } from "pet/texture-generator.js";



var defaults = {
	$name: 'Scepter head',

	width: 1024,
	height: 512,

	xFactor: 18,
	yFactor: 36,
	zFactor: 0,

	colorRim: 0xFFFFFF,
	colorA: 0x70E0FF,
	colorB: 0x3000FF,
};



var hsl = { h: 0, s: 0, l: 0 };

function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var cosX = Math.cos( options.xFactor*x ),
		cosY = Math.cos( options.yFactor*y ),
		cosZ = Math.cos( options.zFactor*z );

	var k = -noise( x/cosX, y/cosY, z/cosZ );

	var dx = Math.abs( ( options.xFactor*x*Math.tan( options.xFactor*x )+1 )/Math.cos( options.xFactor*x ) );
	var dy = Math.abs( ( options.yFactor*y*Math.tan( options.yFactor*y )+1 )/Math.cos( options.yFactor*y ) );
	var dz = Math.abs( ( options.zFactor*z*Math.tan( options.zFactor*z )+1 )/Math.cos( options.zFactor*z ) );

	if ( dx<55 && dy<55 && dz<55 ) {

		var indexX = Math.abs( Math.floor( ( x/Math.PI*2*options.xFactor+1 )/2 ) );
		var indexY = Math.abs( Math.floor( ( y/Math.PI*2*options.yFactor+1 )/2 ) );
		var indexZ = Math.abs( Math.floor( ( z/Math.PI*2*options.zFactor+1 )/2 ) );
		var index = ( indexX+indexY+indexZ )%2;
		color.lerpColors( options.colorA, options.colorB, index );
		color.getHSL( hsl );
		color.setHSL( hsl.h, hsl.s, k*hsl.l );

	} else {

		color.copy( options.colorRim );

		color.getHSL( hsl );
		color.setHSL( hsl.h, hsl.s, 2*k*hsl.l );

	}

}



function options( params ) {

	var options = { };

	options.colorRim = new Color( params.colorRim ?? defaults.colorRim );
	options.colorA = new Color( params.colorA ?? defaults.colorA );
	options.colorB = new Color( params.colorB ?? defaults.colorB );

	options.xFactor = 2**( ( params.xFactor ?? defaults.xFactor )/100 * Math.log2( 30/1.35 ) + Math.log2( 1.35 	) );
	options.yFactor = 2**( ( params.yFactor ?? defaults.yFactor )/100 * Math.log2( 30/1.35 ) + Math.log2( 1.35 ) );
	options.zFactor = 2**( ( params.zFactor ?? defaults.zFactor )/100 * Math.log2( 30/1.35 ) + Math.log2( 1.35 ) );

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
