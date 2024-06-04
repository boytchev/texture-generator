
//	Procedural Equirectangular Textures
//	Template Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { noise, texture as coreTexture } from "pet/texture-generator.js";



var defaults = {
	$name: 'Template',

	width: 512,
	height: 256,

	scale: 5,
};



function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	color.set(
		Math.sin( options.scale*noise( x, y, z ) ),
		Math.sin( options.scale*noise( y, z, x ) ),
		Math.sin( options.scale*noise( z, x, y ) ),
	);

}



function options( params ) {

	var options = { };

	options.scale = params.scale ?? defaults.scale;

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
