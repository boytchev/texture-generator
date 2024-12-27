
//	Procedural Equirectangular Textures
//	Template Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { noise, retexture } from "../texture-generator.js";



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

	return {

		scale: params.scale ?? defaults.scale,

		width: params.width ?? defaults.width,
		height: params.height ?? defaults.height,
	};

}



function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "../texture-generator.js";
