

import { Vector3, Color, MathUtils } from "three";
import { noise } from "../noise.js";



function options( opt )
{
	var options = { };
	
	options.size = 10.1-(opt.size??5);
	options.color = new Color( opt.color ?? 0xffffff );
	options.backgroundColor = new Color( opt.backgroundColor ?? 0x000000 );
	
	return options;
}
	



function pattern( x, y, z, color, options, /*u, v, px, py, width, height*/ )
{
	var k = 0.5 - 0.5*noise( options.size*x, options.size*y, options.size*z );
	
	color.lerpColors( options.color, options.backgroundColor, k );
}



function share( options )
{
	var params = [];
	
	params.push( `b=${options.balance}` );
	params.push( `c=${options.color}` );
	params.push( `k=${options.backgroundColor}` );
	params.push( `r=${options.resolution}` );
	params.push( `s=${options.size}` );
	
	params = params.join( '&' );
	
	return window.location.href.split('?')[0].split('#')[0] + '?' + params;
}



var info = {
		name: 'Simplex noise',
		lightIntensity: 3,
	};


export { pattern, options, share, info };