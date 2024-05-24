
//	Procedural Equirectangular Textures
//	Zebra lines Pattern
//
//	pattern( ... )	- implements Zebra lines pattern
//	options( opt )	- converts options into internal format
//	share( opt )	- converts options into URL
//	info			- general info for the generator



import { Vector3, MathUtils } from "three";
import { noise } from "../noise.js";



var vec = new Vector3( );

function pattern( x, y, z, color, options, /*u, v, px, py, width, height*/ )
{
	vec.set( x, y, z );
	
	var a = vec.angleTo( options.up );
		
	var sin = Math.sin( options.size*a );

	var k = MathUtils.mapLinear( sin, -options.size/500, options.size/500, 0, 1 );
		
	color.setHSL( 0, 0, k );
}



function options( opt )
{
	var options = { };
		
	var angle = (opt.angle??0)*Math.PI/180;
	
	options.size = MathUtils.mapLinear( opt.size, 0, 100, 151, 2 );
	
	options.up = new Vector3( 0, 1e-6*Math.round(1e6*Math.cos( angle )), 1e-6*Math.round(1e6*Math.sin( angle )) );

	return options;
}
	


function share( opt )
{
	var params = [];
	
	params.push( `a=${opt.angle}` );
	params.push( `r=${opt.resolution}` );
	params.push( `s=${opt.size}` );

	params = params.join( '&' );
	return window.location.href.split('?')[0].split('#')[0] + '?' + params;
}



var info = {
		name: 'Zebra lines',
		info: 'Designed for .map properties',
		lightIntensity: 5,
	};



export { pattern, options, share, info };