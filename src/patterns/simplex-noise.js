
//	Procedural Equirectangular Textures
//	Simplex noise Pattern
//
//	pattern( ... )		- implements the pattern
//	texture( params )	- generate a texture with options
//	options( params )	- converts options into internal format
//	share( opt )		- converts options into URL
//	info				- general info for the generator
//	fix( ... )			- reexport from core



import { Color } from "three";
import { noise, equitexture, equimaterial } from "pet/texture-generator.js";



function pattern( x, y, z, color, options, /*u, v, px, py*/ )
{
	var k = 0.5 - 0.5*noise( options.scale*x, options.scale*y, options.scale*z );
	
	color.lerpColors( options.color, options.backgroundColor, k**options.balance );
}



function options( params )
{
	var options = { };
	
	options.scale = 2**(-((params.scale??50)-100)/50 * 3 - 1);
	options.balance = Math.exp(((params.balance??50)-50)/10);
	options.color = new Color( params.color ?? 0xffffff );
	options.backgroundColor = new Color( params.backgroundColor ?? 0x000000 );
	
	options.width = params.width ?? 512;
	options.height = params.height ?? 256;
	
	return options;
}
	


function share( params )
{
	var url = [];
	
	url.push( `w=${params.width}` );
	url.push( `h=${params.height}` );

	url.push( `s=${params.scale}` );
	url.push( `b=${params.balance}` );
	
	url.push( `c=${params.color}` );
	url.push( `k=${params.backgroundColor}` );
	
	return url.join( '&' );
}



function texture( opt )
{
	return equitexture( pattern, options(opt) )
}



var info = {name: 'Simplex noise', lightIntensity: 3 }



export { pattern, options, share, info, texture, equimaterial as fix };