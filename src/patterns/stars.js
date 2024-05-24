
//	Procedural Equirectangular Textures
//	Stars Pattern
//
//	pattern( ... )	- implements Stars pattern
//	options( opt )	- converts options into internal format
//	share( opt )	- converts options into URL
//	info			- general info for the generator



import { Color } from "three";
import { noise } from "../noise.js";



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
		s = options.brightness*(0.5+0.3*noise( y, z, x )+0.3*noise( z, x, y ))**options.density;
	}
	
	color.lerpColors( options.backgroundColor, options.color, s );
	if( s > 0.1 ) color.offsetHSL( s*options.variation*k, 0, 0 );
}



function options( opt )
{
	var options = { };
	
	options.brightness = 0.5 + (opt.brightness ?? 50)/20;
	options.density = 200/(1+(opt.density ?? 30));
	options.variation = (opt.variation ?? 0)/100;
	options.color = new Color( opt.color ?? 0xfff5f0 );
	options.backgroundColor = new Color( opt.backgroundColor ?? 0x000060 );
	
	return options;
}
	


function share( opt )
{
	var params = [];
	
	params.push( `b=${opt.brightness}` );
	params.push( `c=${opt.color}` );
	params.push( `d=${opt.density}` );
	params.push( `k=${opt.backgroundColor}` );
	params.push( `r=${opt.resolution}` );
	params.push( `v=${opt.variation}` );
	
	params = params.join( '&' );
	
	return window.location.href.split('?')[0].split('#')[0] + '?' + params;
}



var info = {
		name: 'Stars',
		info: 'Designed for .map properties',
		lightIntensity: 3,
	};



export { pattern, options, share, info };