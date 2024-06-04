
//	Procedural Equirectangular Textures
//	Concrete Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { noise, texture as coreTexture } from "pet/texture-generator.js";



var defaults = {
	$name: 'Concrete',

	width: 512,
	height: 256,

	scale: 50,
	density: 100,
	bump: 100,
};



function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var k = noise( x, y, z, options.scale );

	color.setHSL( 0, 0, options.bump*( 0.5+0.5*k )**options.density );

}



function options( params ) {

	var options = { };

	options.scale = 2**( 6.5-4*( params.scale??defaults.scale )/100 );

	options.density = 10-10*( ( params.density??defaults.density )/100*0.9 )**0.5;
	options.bump = ( params.bump??defaults.bump )/100;

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
