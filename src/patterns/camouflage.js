
//	Procedural Equirectangular Textures
//	Camouflage Pattern
//
//	pattern( ... )	- implements camouflage pattern
//	options( opt )	- converts options into internal format
//	share( opt )	- converts options into URL
//	info			- general info for the generator



import { Color } from "three";
import { noise } from "pet/noise.js";



function options( opt )
{
	var options = { };
		
	options.colorA = new Color( opt.colorA ?? 0xc2bea8 );
	options.colorB = new Color( opt.colorB ?? 0x9c895e );
	options.colorC = new Color( opt.colorC ?? 0x92a375 );
	options.colorD = new Color( opt.colorD ?? 0x717561 );

	options.size = 2**(-((opt.size??50)-100)/50 * 3 - 1);
	
	options.hue = (opt.hue??0)/360;
	options.saturation = (opt.saturation??0)/100;
	options.brightness = (opt.brightness??0)/100;

	return options;
}
	


function pattern( x, y, z, color, options, /*u, v, px, py, width, height*/ )
{
	x *= options.size;
	y *= options.size;
	z *= options.size;

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



function share( opt )
{
	var params = [];
	
	params.push( `a=${opt.colorA}` );
	params.push( `b=${opt.colorB}` );
	params.push( `c=${opt.colorC}` );
	params.push( `d=${opt.colorD}` );
	params.push( `g=${opt.brightness}` );
	params.push( `h=${opt.hue}` );
	params.push( `r=${opt.resolution}` );
	params.push( `s=${opt.size}` );
	params.push( `t=${opt.saturation}` );

	params = params.join( '&' );
	return window.location.href.split('?')[0].split('#')[0] + '?' + params;
}



var info = {
		name: 'Camouflage',
		info: 'Suitable for .map properties.',
	};



export { pattern, options, share, info };