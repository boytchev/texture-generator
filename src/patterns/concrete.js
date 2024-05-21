

import { Vector3, Color } from "three";
import { noise } from "../noise.js";



function options( opt )
{
	var options = { };
		
	options.size = 100 - (opt.size??50);
	options.height = (opt.height??100)/100;

	return options;
}
	


function pattern( x, y, z, color, options, /*u, v, px, py, width, height*/ )
{
	var k = noise( options.size*x, options.size*y, options.size*z );
		
	color.setHSL( 0, 0, options.height*(0.5+0.5*k) );
}



function share( options )
{
	var params = [];
	
	params.push( `h=${options.height}` );
	params.push( `r=${options.resolution}` );
	params.push( `s=${options.size}` );

	params = params.join( '&' );
	return window.location.href.split('?')[0].split('#')[0] + '?' + params;
}


var info = {
		name: 'Concrete',
		lightIntensity: 3,
	};


export { pattern, options, share, info };