

import { Vector3, Color, MathUtils } from "three";
import { noise } from "../noise.js";



function options( opt )
{
	var options = { };
	
	options.size = 11-(opt.size??7);
	options.density = (opt.density??2);
	options.blur = (opt.blur??1);
	options.balance = (opt.balance??5);
	options.color = new Color( opt.color ?? 0xffffff );
	options.backgroundColor = new Color( opt.backgroundColor ?? 0x000000 );
	
	return options;
}
	



function pattern( x, y, z, color, options, /*u, v, px, py, width, height*/ )
{
	var k = noise( options.size*x, options.size*y, options.size*z );
	
	k = 0.5 - 0.5*Math.sin(2*Math.PI*options.density*k);
	
	k = MathUtils.smoothstep( k, (options.balance-options.blur)/10-0.01, (options.balance+options.blur)/10+0.01 );
	
	color.lerpColors( options.color, options.backgroundColor, k );
}



function share( options )
{
	var params = [];
	
	params.push( `a=${options.balance}` );
	params.push( `b=${options.blur}` );
	params.push( `d=${options.density}` );
	params.push( `c=${options.color}` );
	params.push( `k=${options.backgroundColor}` );
	params.push( `r=${options.resolution}` );
	params.push( `s=${options.size}` );
	
	params = params.join( '&' );
	
	return window.location.href.split('?')[0].split('#')[0] + '?' + params;
}



var info = {
		name: 'Iso lines',
		lightIntensity: 4,
	};


export { pattern, options, share, info };