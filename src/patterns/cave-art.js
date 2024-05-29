
//	Procedural Equirectangular Textures
//	Cave Art Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Vector3, Color, MathUtils } from "three";
import { noise, texture as coreTexture } from "pet/texture-generator.js";



var defaults = {
		$name: 'Cave art',
		
		width: 1024,
		height: 512,

		scale: 50,
		thickness: 20,
		noise: 30,
		
		color: 0xD34545,
		background: 0xFFF8F0,
	};



function pattern( x, y, z, color, options, /*u, v, px, py*/ )
{
	var scale2 = 1.5*options.scale;
			
	var k1 = noise( options.scale*x, options.scale*y, options.scale*z ),
		k2 = noise( scale2*x, scale2*y, scale2*z );

	k1 = Math.sin( 3*k1 );
	k2 = Math.cos( 3*k2 );
	
	var k = options.thickness-20*Math.abs(k1+k2)**2;
	
	if( k1>k2 || k<0 ) k=0;
	if( k<=0 ) k = options.noise*Math.random();
	
	color.lerpColors( options.background, options.color, k );
}



function options( params )
{
	var options = { };

	options.color = new Color( params.color ?? defaults.color );
	options.background = new Color( params.background ?? defaults.background );

	options.scale = 2**(-((params.scale??defaults.scale)-100)/50 * 3 - 1);
	options.thickness = 0.3 + (params.thickness??defaults.thickness)/5;
	options.noise = (params.noise??defaults.noise)/300;

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