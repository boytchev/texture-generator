

import { Vector3, Color, MathUtils } from "three";
import { noise } from "../noise.js";
import { map } from "../utils.js";


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
	


var vec = new Vector3();

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



function share( options )
{
	var params = [];
	
	params.push( `a=${options.colorA}` );
	params.push( `b=${options.colorB}` );
	params.push( `c=${options.colorC}` );
	params.push( `d=${options.colorD}` );
	params.push( `g=${options.brightness}` );
	params.push( `h=${options.hue}` );
	params.push( `r=${options.resolution}` );
	params.push( `s=${options.size}` );
	params.push( `t=${options.saturation}` );

	params = params.join( '&' );
	return window.location.href.split('?')[0].split('#')[0] + '?' + params;
}


var info = {
		name: 'Camouflage',
	};


export { pattern, options, share, info };