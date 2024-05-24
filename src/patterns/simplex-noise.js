
//	Procedural Equirectangular Textures
//	Simplex noise Pattern
//
//	pattern( ... )	- implements Simplex noise pattern
//	options( opt )	- converts options into internal format
//	share( opt )	- converts options into URL
//	info			- general info for the generator



import { Color } from "three";
import { noise } from "../noise.js";



function pattern( x, y, z, color, options, /*u, v, px, py, width, height*/ )
{
	var k = 0.5 - 0.5*noise( options.size*x, options.size*y, options.size*z );
	
	color.lerpColors( options.color, options.backgroundColor, k**options.balance );
}



function options( opt )
{
	var options = { };
	
	options.size = 2**(-((opt.size??50)-100)/50 * 3 - 1);
	options.balance = Math.exp(((opt.balance??50)-50)/10);
	options.color = new Color( opt.color ?? 0xffffff );
	options.backgroundColor = new Color( opt.backgroundColor ?? 0x000000 );
	
	return options;
}
	



function share( opt )
{
	var params = [];
	
	params.push( `b=${opt.balance}` );
	params.push( `c=${opt.color}` );
	params.push( `k=${opt.backgroundColor}` );
	params.push( `r=${opt.resolution}` );
	params.push( `s=${opt.size}` );
	
	params = params.join( '&' );
	
	return window.location.href.split('?')[0].split('#')[0] + '?' + params;
}



var info = {
		name: 'Simplex noise',
		info: 'Designed for .map properties',
		lightIntensity: 3,
	};



export { pattern, options, share, info };