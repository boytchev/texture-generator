
//	Procedural Equirectangular Textures
//	Zebra Lines Pattern
//
//	pattern( ... )	- implements Zebra lines pattern
//	options( opt )	- converts options into internal format
//	share( opt )	- converts options into URL
//	info			- general info for the generator



import { Vector3, MathUtils } from "three";
import { noise, fix } from "pet/texture-generator.js";



var vec = new Vector3( );

function pattern( x, y, z, color, options, /*u, v, px, py*/ )
{
	vec.set( x, y, z );
	
	var a = vec.angleTo( options.up ),		
		sin = Math.sin( options.scale*a );

	var k = MathUtils.mapLinear( sin, -options.scale/500, options.scale/500, 0, 1 );
	
	color.setHSL( 0, 0, k );
}



function options( params )
{
	var options = { };
		
	var angle = (params.angle??0)*Math.PI/180;
	
	options.scale = MathUtils.mapLinear( (params.scale??60), 0, 100, 151, 2 );

	options.up = new Vector3( 0, 1e-6*Math.round(1e6*Math.cos( angle )), 1e-6*Math.round(1e6*Math.sin( angle )) );

	options.width = params.width ?? 1024;
	options.height = params.height ?? 512;
	
	return options;
}
	


function share( params )
{
	var url = [];
	
	url.push( `w=${params.width}` );
	url.push( `h=${params.height}` );

	url.push( `s=${params.scale}` );
	url.push( `a=${params.angle}` );

	return url.join( '&' );
}



function texture( opt )
{
	return equitexture( pattern, options(opt) )
}



var info = {name: 'Zebra lines', lightIntensity: 5 };



export { pattern, options, share, info, texture };
export * from "pet/texture-generator.js";