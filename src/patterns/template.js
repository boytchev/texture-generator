
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
import { noise, equitexture, equimaterial } from "pet/texture-generator.js";



function pattern( x, y, z, color, options, /*u, v, px, py*/ )
{
	color.set( 
		Math.sin( options.size*noise(x,y,z) ),
		Math.sin( options.size*noise(y,z,x) ),
		Math.sin( options.size*noise(z,x,y) ),
	);
}



function options( opt )
{
	var options = { };
		
	options.size = opt.size;
	options.width = opt.width;
	options.height = opt.height;

	return options;
}
	


function share( opt )
{
	var params = [];
	
	params.push( `r=${opt.resolution}` );
	params.push( `s=${opt.size}` );	params.push( `t=${opt.saturation}` );

	params = params.join( '&' );
	return window.location.href.split('?')[0].split('#')[0] + '?' + params;
}



function texture( opt )
{
	return equitexture( pattern, options(opt) )
}



var info = { name: 'Template' };



export { pattern, options, share, info, texture, equimaterial as fix };