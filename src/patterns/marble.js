
//	Procedural Equirectangular Textures
//	Marble Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Vector3, Color, MathUtils } from "three";
import { noise, texture as coreTexture } from "pet/texture-generator.js";



var defaults = {
		$name: 'Marble',
		
		width: 1024,
		height: 512,

		scale: 50,
		thickness: 60,
		noise: 30,
		
		color: 0x4545D3,
		background: 0xF0F8FF,
	};



function pattern( x, y, z, color, options, u, v, px, py )
{
	x *= options.scale;
	y *= options.scale;
	z *= options.scale;
	
	var k = noise( x, y, z )
		  + 0.5*noise( 2*x, 2*y, 2*z )
		  + 0.1*noise( 6*x, 6*y, 6*z );
				
	k = 1-Math.abs(k)**2.5;
	
	var min = options.minSmooth*(0.95+0.05*noise( 2*x, 2*y, 2*z ));
	
	if( k>options.maxSmooth )
	{
		k = 1;
	}
	else
	if( k>min )
	{	
		k = 0.5*((k-min)/(options.maxSmooth-min))**20;
		k *= (0.5+0.5*noise(z/2,-x/2,y/2));
	}
	else 
		k = 0;
	
	k += options.noise * Math.random();
	
	color.lerpColors( options.background, options.color, k);
}



function options( params )
{
	var options = { };

	options.color = new Color( params.color ?? defaults.color );
	options.background = new Color( params.background ?? defaults.background );

	options.scale = 2**(2-0.02*(params.scale??defaults.scale));

	var thickness = ((params.thickness??defaults.thickness)/100)**2;
		thickness = MathUtils.mapLinear(thickness,0,1,13,5);
		
	options.maxSmooth = 1-(1/2)**thickness;
	options.minSmooth = 1-(1/2)**(0.8*thickness);
	
	options.noise = 0.2*(params.noise??defaults.noise)/100;

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