
//	Procedural Equirectangular Textures
//	Zebra Lines Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Vector3, MathUtils } from "three";
import { texture as coreTexture } from "pet/texture-generator.js";



var defaults = {
		$name: 'Zebra lines',
		
		width: 512,
		height: 256,

		scale: 60,
		angle: 0,
	};
	
	
	
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
		
	var angle = (params.angle??defaults.angle)*Math.PI/180;
	
	options.scale = MathUtils.mapLinear( (params.scale??defaults.scale), 0, 100, 151, 2 );

	options.up = new Vector3( 0, 1e-6*Math.round(1e6*Math.cos( angle )), 1e-6*Math.round(1e6*Math.sin( angle )) );

	options.width = params.width ?? defaults.width;
	options.height = params.height ?? defaults.height;
	
	return options;
}
	


function texture( ...opt )
{
	if( opt.length==0 ) opt = [defaults];
	
	// if there is {...}, assume it is user options, compile them
	var params = opt.map( (e) => (e!=-null) && (typeof e =='object') && !(e instanceof HTMLCanvasElement) ? options(e) : e );

	// if pattern is missing, add pattern
	if( params.findIndex((e)=>e instanceof Function) == -1 )
	{
		params.push( pattern );
	}
		
	return coreTexture( ... params );
}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";