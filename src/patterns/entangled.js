
//	Procedural Equirectangular Textures
//	Entangled Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, texture as coreTexture } from "pet/texture-generator.js";



var defaults = {
		$name: 'Entangled',
		
		width: 1024,
		height: 512,
		
		scale: 50,
		density: 10,

		color: 0x002040,
		background: 0xFFFFFF,
	};
	
	
	
function pattern( x, y, z, color, options, /*u, v, px, py*/ )
{
	var k = -Infinity;
	var scale = options.scale;
	
	for( var i=0; i<options.density; i++ )
	{
		var k1 = noise( scale*x, scale*y, scale*z );
			k1 = Math.sin( 3*Math.PI*k1 );
		
		k = Math.max( k, k1 );
		
		scale *= 1.2;
	}
	
	k = 1-k**5;
	k = k*6;

	color.lerpColors( options.color, options.background, k );
}



function options( params )
{
	var options = { };

	options.scale = 2**(2.5-0.035*(params.scale??defaults.scale));
	options.density = 1 + (params.density??defaults.density);

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