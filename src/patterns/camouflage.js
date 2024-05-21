

import { Vector3, Color } from "three";
import { noise } from "../noise.js";



function options_old( colorA=0xc2bea8, colorB=0x9c895e, colorC=0x92a375, colorD=0x717561, size=14, hue=0, saturation=0, brightness=0 )
{
	var options = { };
		
	options.colorA = new Color( colorA );
	options.colorB = new Color( colorB );
	options.colorC = new Color( colorC );
	options.colorD = new Color( colorD );

	options.size = 21-size;

	options.hue = hue/360;
	options.saturation = saturation/100;
	options.brightness = brightness/100;

	return options;
}
	


function options( opt )
{
	var options = { };
		
	options.colorA = new Color( opt?.colorA || 0xc2bea8 );
	options.colorB = new Color( opt?.colorB || 0x9c895e );
	options.colorC = new Color( opt?.colorC || 0x92a375 );
	options.colorD = new Color( opt?.colorD || 0x717561 );

	options.size = 21-(opt?.size||14);

	options.hue = (opt?.hue||0)/360;
	options.saturation = (opt?.saturation||0)/100;
	options.brightness = (opt?.brightness||0)/100;

	return options;
}
	


var vec = new Vector3();

function pattern( x, y, z, color, options, /*u, v, px, py, width, height*/ )
{
	var K = options.size;

	var a = Math.round(noise(K*x, K*y, K*z)+0.2),
		b = Math.round(noise(K*y, K*z, K*x)+0.3),
		c = Math.round(noise(K*z, K*x, K*y)+0.4),
		d = Math.round(noise(K*x, K*z, K*y)+0.5);

	if( a>0.5 )
		color.copy( options.colorA );
	else
	if( b>0.5 )
		color.copy( options.colorB );
	else
	if( c>0.5 )
		color.copy( options.colorC );
	else
		color.copy( options.colorD );
		
	color.offsetHSL( options.hue, options.saturation, options.brightness );
}



var info = {
		name: 'Camouflage',
		version: 1.0,
	};


export { options, pattern, info };