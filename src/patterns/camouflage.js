
//	Procedural Equirectangular Textures
//	Camouflage Pattern
//
//	pattern( ... )		- implements the pattern
//	texture( params )	- generate a texture with options
//	options( params )	- converts options into internal format
//	share( opt )	- converts options into URL
//	info			- general info for the generator
//	fix( ... )		- reexport from core



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



function options( opt )
{
	var options = { };
		
	options.colorA = new Color( opt.colorA ?? 0xc2bea8 );
	options.colorB = new Color( opt.colorB ?? 0x9c895e );
	options.colorC = new Color( opt.colorC ?? 0x92a375 );
	options.colorD = new Color( opt.colorD ?? 0x717561 );

	options.scale = 2**(-((opt.scale??50)-100)/50 * 3 - 1);
	
	options.hue = (opt.hue??0)/360;
	options.saturation = (opt.saturation??0)/100;
	options.brightness = (opt.brightness??0)/100;

	options.width = opt.width ?? 512;
	options.height = opt.height ?? 256;
	
	return options;
}
	


function share( opt )
{
	var params = [];
	
	params.push( `a=${opt.colorA}` );
	params.push( `b=${opt.colorB}` );
	params.push( `c=${opt.colorC}` );
	params.push( `d=${opt.colorD}` );
	params.push( `g=${opt.brightness}` );
	params.push( `h=${opt.height}` );
	params.push( `w=${opt.width}` );
	params.push( `s=${opt.scale}` );
	params.push( `t=${opt.saturation}` );
	params.push( `u=${opt.hue}` );

	params = params.join( '&' );
	return window.location.href.split('?')[0].split('#')[0] + '?' + params;
}



function texture( opt )
{
	return equitexture( pattern, options(opt) )
}



var info = { name: 'Camouflage' };



export { pattern, options, share, info, texture, equimaterial as fix };