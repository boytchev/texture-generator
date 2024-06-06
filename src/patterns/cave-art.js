
//	Procedural Equirectangular Textures
//	Cave Art Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, retexture, map, mapExp } from "pet/texture-generator.js";



var defaults = {
	$name: 'Cave art',

	width: 1024,
	height: 512,

	scale: 50,
	thickness: 20,
	noise: 30,

	color: 0xD34545,
	background: 0xFFF8F0,
};



function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var k1 = noise( x, y, z, options.scale ),
		k2 = noise( x, y, z, 1.5*options.scale );

	k1 = Math.sin( 3*k1 );
	k2 = Math.cos( 3*k2 );

	var k = options.thickness-20*Math.abs( k1+k2 )**2;

	if ( k1>k2 || k<0 ) k=0;
	if ( k<=0 ) k = options.noise*Math.random();

	color.lerpColors( options.background, options.color, k );

}



function options( params ) {

	return {
		color: new Color( params.color ?? defaults.color ),
		background: new Color( params.background ?? defaults.background ),

		scale: mapExp( params.scale ?? defaults.scale, 32, 0.5 ),
		thickness: map( params.thickness ?? defaults.thickness, 0.3, 20.3 ),
		noise: map( params.noise ?? defaults.noise, 0, 0.3 ),

		width: params.width ?? defaults.width,
		height: params.height ?? defaults.height,
	};
	
}




function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";
