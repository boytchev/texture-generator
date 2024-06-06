
//	Procedural Equirectangular Textures
//	Marble Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color, MathUtils } from "three";
import { noise, retexture, map, mapExp } from "pet/texture-generator.js";



var defaults = {
	$name: 'Marble',

	width: 1024,
	height: 512,

	scale: 50,
	thickness: 60,
	noise: 30,

	color: 0x4545D3,
	background: 0xF0F8FF,
};



function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	x *= options.scale;
	y *= options.scale;
	z *= options.scale;

	var k = noise( x, y, z )
		  + 0.5*noise( x, y, z, 2 )
		  + 0.1*noise( x, y, z, 6 );

	k = 1-Math.abs( k )**2.5;

	var min = options.minSmooth*( 0.95+0.05*noise( x, y, z, 2 ) );

	if ( k>options.maxSmooth ) {

		k = 1;

	} else
		if ( k>min ) {

			k = 0.5*( ( k-min )/( options.maxSmooth-min ) )**20;
			k *= ( 0.5+0.5*noise( z, -x, y, 1/2 ) );

		} else
			k = 0;

	k += options.noise * Math.random();

	color.lerpColors( options.background, options.color, k );

}



function options( params ) {

	var thickness = map( params.thickness ?? defaults.thickness )**2;
	thickness = map( thickness, 13, 5, 0, 1 );
	
	return { 

		color: new Color( params.color ?? defaults.color ),
		background: new Color( params.background ?? defaults.background ),

		scale: mapExp( params.scale ?? defaults.scale, 4, 1 ),

		maxSmooth: 1-( 1/2 )**thickness,
		minSmooth: 1-( 1/2 )**( 0.8*thickness ),

		noise: map( params.noise ?? defaults.noise, 0, 0.2),

		width: params.width ?? defaults.width,
		height: params.height ?? defaults.height,

	};

}




function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";
