
//	Procedural Equirectangular Textures
//	Isolines Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color, MathUtils } from "three";
import { noise, texture as coreTexture } from "pet/texture-generator.js";



var defaults = {
		$name: 'Isolines',
		
		width: 1024,
		height: 512,
		
		scale: 50,
		density: 20,
		blur: 10,
		balance: 50,

		color: 0xFFFFFF,
		background: 0x000000,				
	};
	
	
	
function pattern( x, y, z, color, options, /*u, v, px, py*/ )
{
	var k = noise( options.scale*x, options.scale*y, options.scale*z );
	
	k = 0.5 - 0.5*Math.sin(options.density*k);
	
	k = MathUtils.smoothstep( k, options.minSmooth, options.maxSmooth );
	
	color.lerpColors( options.color, options.background, k );
}



function options( params )
{
	var options = { };
	
	var blur = (params.blur??defaults.blur)/100,
		balance = (params.balance??defaults.balance)/100;

	options.scale = 2**(-((params.scale??defaults.scale)-100)/50 * 3 - 1);
	options.density = 10 + 50 * (params.density??defaults.density)/100;
		
	options.minSmooth = balance - blur - 0.01;
	options.maxSmooth = balance + blur + 0.01;
	
	options.color = new Color( params.color ??defaults.color );
	options.background = new Color( params.background ??defaults.background );

	options.width = params.width ??defaults.width;
	options.height = params.height ??defaults.height;
	
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