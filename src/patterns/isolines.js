
//	Procedural Equirectangular Textures
//	Isolines Pattern
//
//	pattern( ... )	- implements isolines pattern
//	options( opt )	- converts options into internal format
//	share( opt )	- converts options into URL
//	info			- general info for the generator



import { Color, MathUtils } from "three";
import { noise } from "../noise.js";



function pattern( x, y, z, color, options, /*u, v, px, py, width, height*/ )
{
	var k = noise( options.size*x, options.size*y, options.size*z );
	
	k = 0.5 - 0.5*Math.sin(options.density*k);
	
	k = MathUtils.smoothstep( k, options.smoothFrom, options.smoothTo );
	
	color.lerpColors( options.color, options.backgroundColor, k );
}



function options( opt )
{
	var options = { };
	
	var blur = (opt.blur??10)/100,
		balance = (opt.balance??50)/100;

	options.size = 2**(-((opt.size??50)-100)/50 * 3 - 1);
	options.density = 10 + 50 * (opt.density??20)/100;
		
	options.smoothFrom = balance - blur - 0.01;
	options.smoothTo = balance + blur + 0.01;
	
	options.color = new Color( opt.color ?? 0xffffff );
	options.backgroundColor = new Color( opt.backgroundColor ?? 0x000000 );
	
	return options;
}
	


function share( opt )
{
	var params = [];
	
	params.push( `a=${opt.balance}` );
	params.push( `b=${opt.blur}` );
	params.push( `d=${opt.density}` );
	params.push( `c=${opt.color}` );
	params.push( `k=${opt.backgroundColor}` );
	params.push( `r=${opt.resolution}` );
	params.push( `s=${opt.size}` );
	
	params = params.join( '&' );
	
	return window.location.href.split('?')[0].split('#')[0] + '?' + params;
}



var info = {
		name: 'Isolines',
		info: 'Designed for .map properties',
		lightIntensity: 4,
	};


export { pattern, options, share, info };