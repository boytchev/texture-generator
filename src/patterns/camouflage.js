
//	Procedural Equirectangular Textures
//	Camouflage Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, texture as coreTexture } from "pet/texture-generator.js";



var defaults = {
		$name: 'Camouflage',
		
		width: 512,
		height: 256,
		
		scale: 50,
		
		colorA: 0xc2bea8,
		colorB: 0x9c895e,
		colorC: 0x92a375,
		colorD: 0x717561,
		
		hue: 0,
		saturation: 0,
		brightness: 0,
	};
			
			
			
function pattern( x, y, z, color, options, /*u, v, px, py*/ )
{
	x *= options.scale;
	y *= options.scale;
	z *= options.scale;

	if( Math.round( noise(x,y,z)+0.2 ) > 0.5 )
		color.copy( options.colorA );
	else
	if( Math.round( noise(y,z,x)+0.3 ) > 0.5 )
		color.copy( options.colorB );
	else
	if( Math.round( noise(z,x,y)+0.4 ) > 0.5 )
		color.copy( options.colorC );
	else
		color.copy( options.colorD );
		
	color.offsetHSL( options.hue, options.saturation, options.brightness );
}



function options( params )
{
	var options = { };
		
	options.colorA = new Color( params.colorA ?? defaults.colorA );
	options.colorB = new Color( params.colorB ?? defaults.colorB );
	options.colorC = new Color( params.colorC ?? defaults.colorC );
	options.colorD = new Color( params.colorD ?? defaults.colorD );

	options.scale = 2**(-((params.scale??defaults.scale)-100)/50 * 3 - 1);
	
	options.hue = (params.hue??defaults.hue)/360;
	options.saturation = (params.saturation??defaults.saturation)/100;
	options.brightness = (params.brightness??defaults.brightness)/100;

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