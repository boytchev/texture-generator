
//	Procedural Equirectangular Textures
//	Template Pattern
//
//	pattern( ... )	- implements the pattern
//	texture( opt )	- generate a texture with options
//	options( opt )	- converts options into internal format
//	share( opt )	- converts options into URL
//	info			- general info for the generator
//	fix( ... )		- reexport from core



import { Color } from "three";
import { noise, fix } from "pet/texture-generator.js";



function pattern( x, y, z, color, options, /*u, v, px, py*/ )
{
	color.set( 
		Math.sin( options.scale*noise(x,y,z) ),
		Math.sin( options.scale*noise(y,z,x) ),
		Math.sin( options.scale*noise(z,x,y) ),
	);
}



function options( params )
{
	var options = { };
		
	options.scale = params.scale;
	
	options.width = params.width;
	options.height = params.height;

	return options;
}
	


function share( params )
{
	var params = [];
	
	url.push( `w=${params.width}` );
	url.push( `h=${params.height}` );

	url.push( `s=${params.scale}` );

	return url.join( '&' );
}



function texture( opt )
{
	return fix( pattern, options(opt) )
}



var info = { name: 'Template' };



export { pattern, options, share, info, texture };
export * from "pet/texture-generator.js";