
//	Procedural Equirectangular Textures
//	Stars Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, retexture, map } from "../texture-generator.js";



var defaults = {
	$name: 'Stars',

	width: 1024,
	height: 512,

	density: 20,
	brightness: 20,
	variation: 0,

	color: 0xfff5f0,
	background: 0x000060,
};



function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var s = 0,
		H = options.width/25,
		eps = 0.15;

	x *= H;
	y *= H;
	z *= H;

	var k = noise( x, y, z );
	var n = false;
	for ( var dx=-1; dx<=1; dx++ ) if ( !n )
		for ( var dy=-1; dy<=1; dy++ ) if ( !n )
			for ( var dz=-1; dz<=1; dz++ ) if ( !n )
				if ( dx && dy && dz )
					if ( k < noise( x+dx*eps, y+dy*eps, z+dz*eps ) )
						n=true;

	if ( !n ) {

		s = options.brightness*( 0.6+0.3*noise( y, z, x, 1/4 )+0.3*noise( z, x, y, 1/2 ) )**options.density;

	}

	color.lerpColors( options.background, options.color, s );

	if ( s > 0.1 ) color.offsetHSL( s*options.variation/*k*/, 0, 0 );

}



function options( params ) {

	return {

		brightness: map( params.brightness ?? defaults.brightness, 0.3, 5.3 ),
		density: 100/( 0+( params.density ?? defaults.density ) ),
		variation: map( params.variation ?? defaults.variation ),

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
export { material } from "../texture-generator.js";
