
//	Procedural Equirectangular Textures
//	Scream Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, retexture, mapExp } from "pet/texture-generator.js";



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

	return {

		scale: mapExp( params.scale ?? defaults.scale, 15, 2.5 ),

		color: new Color( params.color ?? defaults.color ),
		background: new Color( params.background ?? defaults.background ),

		width: params.width ?? defaults.width,
		height: params.height ?? defaults.height,

	};

}



function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";
