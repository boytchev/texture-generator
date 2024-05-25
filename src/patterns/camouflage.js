
//	Procedural Equirectangular Textures
//	Camouflage Pattern
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
	x *= options.scale;
	y *= options.scale;
	z *= options.scale;

	if( Math.round( noise(x,y,z)+0.2 ) > 0.5 )
		color.copy( options.colorA );
	else
	if( Math.round( noise(y,z,x)+0.3 ) > 0.5 )
		color.copy( options.colorB );
	else
	if( Math.round( noise(z,x,y)+0.4 ) > 0.5 )
		color.copy( options.colorC );
	else
		color.copy( options.colorD );
		
	color.offsetHSL( options.hue, options.saturation, options.brightness );
}



function options( params )
{
	var options = { };
		
	options.colorA = new Color( params.colorA ?? 0xc2bea8 );
	options.colorB = new Color( params.colorB ?? 0x9c895e );
	options.colorC = new Color( params.colorC ?? 0x92a375 );
	options.colorD = new Color( params.colorD ?? 0x717561 );

	options.scale = 2**(-((params.scale??50)-100)/50 * 3 - 1);
	
	options.hue = (params.hue??0)/360;
	options.saturation = (params.saturation??0)/100;
	options.brightness = (params.brightness??0)/100;

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

	url.push( `a=${params.colorA}` );
	url.push( `b=${params.colorB}` );
	url.push( `c=${params.colorC}` );
	url.push( `d=${params.colorD}` );
	
	url.push( `u=${params.hue}` );
	url.push( `t=${params.saturation}` );
	url.push( `g=${params.brightness}` );

	return url.join( '&' );
}



function texture( opt )
{
	return equitexture( pattern, options(opt) )
}



var info = { name: 'Camouflage' };



export { pattern, options, share, info, texture, equimaterial as fix };