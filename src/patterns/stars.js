

import { Vector3, Color, MathUtils } from "three";
import { noise, noiseSeed } from "../noise.js";



function options( opt )
{
	var options = { };
	
	options.brightness = opt.brightness ?? 2;
	options.density = opt.density ?? 15;
	options.starsColor = new Color( opt.starsColor ?? 0xdfdfff );
	options.skyColor = new Color( opt.skyColor ?? 0x000045 );
	
	return options;
}
	


function pattern( x, y, z, color, options, u, v, px, py, width, height )
{
	var s = 0,
		eps = 0.2,
		H = 0.2*width;
	
	x *= H;
	y *= H;
	z *= H;

	var k = noise( x, y, z );
	if (k > noise( x+eps, y, z ))
	if (k > noise( x-eps, y, z ))
	if (k > noise( x, y+eps, z ))
	if (k > noise( x, y-eps, z ))
	if (k > noise( x, y, z+eps ))
	if (k > noise( x, y, z-eps ))
	{
		s = options.brightness*(0.5+0.25*noise( y, z, x )+0.25*noise( z, x, y ))**(21-options.density);
	}
	color.lerpColors( options.skyColor, options.starsColor, s );
	color.offsetHSL( 0.3*Math.random()-0.15, 0, 0 );
}



function share( options )
{
	var params = [];
	
	params.push( `b=${options.brightness}` );
	params.push( `c=${options.starsColor}` );
	params.push( `d=${options.density}` );
	params.push( `k=${options.skyColor}` );
	params.push( `r=${options.resolution}` );
	
	params = params.join( '&' );
	
	return window.location.href.split('?')[0].split('#')[0] + '?' + params;
}



var info = {
		name: 'Stars',
		lightIntensity: 3,
	};


export { pattern, options, share, info };