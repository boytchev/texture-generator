

import { Vector3, Color, MathUtils } from "three";
import { noise } from "../noise.js";



function options( opt )
{
	var options = { };
		
	var angle = (opt.angle??0)*Math.PI/180;
	
	options.size = 100 - (opt.size??50);
	options.up = new Vector3( 0, 1e-6*Math.round(1e6*Math.cos( angle )), 1e-6*Math.round(1e6*Math.sin( angle )) );

	return options;
}
	


var vec = new Vector3( );
var limit = 0.01;

function pattern( x, y, z, color, options, /*u, v, px, py, width, height*/ )
{
	vec.set( x, y, z );
	
	var a = vec.angleTo( options.up );
		
	var sin = Math.sin( options.size*a );

	var k = MathUtils.mapLinear( sin, -options.size/500, options.size/500, 0, 1 );
		
	color.setHSL( 0, 0, k );
}



function share( options )
{
	var params = [];
	
	params.push( `a=${options.angle}` );
	params.push( `r=${options.resolution}` );
	params.push( `s=${options.size}` );

	params = params.join( '&' );
	return window.location.href.split('?')[0].split('#')[0] + '?' + params;
}


var info = {
		name: 'Zebra lines',
		lightIntensity: 5,
	};


export { pattern, options, share, info };